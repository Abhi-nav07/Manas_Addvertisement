import { z } from 'zod';
import { Router } from 'express';
import prisma from '@/database/prisma';
import { createCrudService } from '@/services/crudFactory';
import { createCrudController } from '@/controllers/crudFactory';
import { validate } from '@/middlewares/validate.middleware';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermission } from '@/middlewares/rbac.middleware';
import { PERMISSIONS } from '@/constants/roles';
import { paginationQuerySchema, idParamSchema } from '@/validators/common.validator';
import { asyncHandler } from '@/utils/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { ApiError } from '@/utils/ApiError';

const portfolioBody = z.object({
  title: z.string().min(2).max(150),
  slug: z.string().min(2).max(160).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10),
  clientName: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});
const listSchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema, params: z.object({}).optional() });
const createSchema = z.object({ body: portfolioBody, query: z.object({}).optional(), params: z.object({}).optional() });
const updateSchema = z.object({ body: portfolioBody.partial(), query: z.object({}).optional(), params: idParamSchema });
const idSchema = z.object({ body: z.object({}).optional(), query: z.object({}).optional(), params: idParamSchema });
const attachImageSchema = z.object({
  body: z.object({ mediaFileId: z.string().uuid(), order: z.number().int().optional() }),
  query: z.object({}).optional(),
  params: idParamSchema,
});

const router = Router();
const service = createCrudService({ resourceName: 'Portfolio', delegate: prisma.portfolio, searchableFields: ['title', 'description', 'clientName'], uniqueField: 'slug' });
const controller = createCrudController(service);

router.get('/', validate(listSchema), controller.list);
router.get('/:id', validate(idSchema), asyncHandler(async (req, res) => {
  const item = await prisma.portfolio.findFirst({
    where: { id: req.params.id },
    include: { images: { include: { mediaFile: true }, orderBy: { order: 'asc' } }, category: true },
  });
  if (!item) throw ApiError.notFound('Portfolio not found');
  return ApiResponse.success(res, item);
}));
router.post('/', authenticate, requirePermission(PERMISSIONS.PORTFOLIO_MANAGE), validate(createSchema), controller.create);
router.put('/:id', authenticate, requirePermission(PERMISSIONS.PORTFOLIO_MANAGE), validate(updateSchema), controller.update);
router.delete('/:id', authenticate, requirePermission(PERMISSIONS.PORTFOLIO_MANAGE), validate(idSchema), controller.remove);

// Attach/detach gallery images to a portfolio item.
router.post('/:id/images', authenticate, requirePermission(PERMISSIONS.PORTFOLIO_MANAGE), validate(attachImageSchema), asyncHandler(async (req, res) => {
  await service.getById(req.params.id);
  const image = await prisma.portfolioImage.create({
    data: { portfolioId: req.params.id, mediaFileId: req.body.mediaFileId, order: req.body.order ?? 0 },
  });
  return ApiResponse.created(res, image);
}));
router.delete('/:id/images/:imageId', authenticate, requirePermission(PERMISSIONS.PORTFOLIO_MANAGE), asyncHandler(async (req, res) => {
  await prisma.portfolioImage.delete({ where: { id: req.params.imageId } });
  return ApiResponse.noContent(res);
}));

export default router;

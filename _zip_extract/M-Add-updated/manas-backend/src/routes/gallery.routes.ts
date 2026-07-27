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

const galleryBody = z.object({
  title: z.string().min(2).max(150),
  mediaFileId: z.string().uuid(),
  order: z.number().int().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});
const listSchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema, params: z.object({}).optional() });
const createSchema = z.object({ body: galleryBody, query: z.object({}).optional(), params: z.object({}).optional() });
const updateSchema = z.object({ body: galleryBody.partial(), query: z.object({}).optional(), params: idParamSchema });
const idSchema = z.object({ body: z.object({}).optional(), query: z.object({}).optional(), params: idParamSchema });

const router = Router();
const service = createCrudService({ resourceName: 'Gallery', delegate: prisma.gallery, searchableFields: ['title'], defaultSortField: 'order' });
const controller = createCrudController(service);

router.get('/', validate(listSchema), controller.list);
router.get('/:id', validate(idSchema), controller.getById);
router.post('/', authenticate, requirePermission(PERMISSIONS.GALLERY_MANAGE), validate(createSchema), controller.create);
router.put('/:id', authenticate, requirePermission(PERMISSIONS.GALLERY_MANAGE), validate(updateSchema), controller.update);
router.delete('/:id', authenticate, requirePermission(PERMISSIONS.GALLERY_MANAGE), validate(idSchema), controller.remove);

export default router;

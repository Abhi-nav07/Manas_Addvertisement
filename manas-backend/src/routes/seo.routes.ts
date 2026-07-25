import { z } from 'zod';
import { Router } from 'express';
import prisma from '@/database/prisma';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermission } from '@/middlewares/rbac.middleware';
import { PERMISSIONS } from '@/constants/roles';
import { validate } from '@/middlewares/validate.middleware';
import { asyncHandler } from '@/utils/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';

const seoBody = z.object({
  title: z.string().max(70).optional(),
  description: z.string().max(160).optional(),
  keywords: z.string().max(255).optional(),
  ogImage: z.string().url().optional(),
});
const upsertSchema = z.object({
  body: seoBody,
  query: z.object({}).optional(),
  params: z.object({ entityType: z.string(), entityId: z.string().uuid() }),
});

const router = Router();

router.get('/:entityType/:entityId', asyncHandler(async (req, res) => {
  const seo = await prisma.seoMetadata.findUnique({
    where: { entityType_entityId: { entityType: req.params.entityType, entityId: req.params.entityId } },
  });
  return ApiResponse.success(res, seo ?? null);
}));

router.put(
  '/:entityType/:entityId',
  authenticate,
  requirePermission(PERMISSIONS.SETTINGS_MANAGE),
  validate(upsertSchema),
  asyncHandler(async (req, res) => {
    const seo = await prisma.seoMetadata.upsert({
      where: { entityType_entityId: { entityType: req.params.entityType, entityId: req.params.entityId } },
      update: req.body,
      create: { entityType: req.params.entityType, entityId: req.params.entityId, ...req.body },
    });
    return ApiResponse.success(res, seo, 'SEO metadata saved');
  }),
);

export default router;

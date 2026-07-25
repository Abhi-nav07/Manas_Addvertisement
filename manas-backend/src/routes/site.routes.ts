import { z } from 'zod';
import { Router } from 'express';
import prisma from '@/database/prisma';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermission } from '@/middlewares/rbac.middleware';
import { PERMISSIONS } from '@/constants/roles';
import { validate } from '@/middlewares/validate.middleware';
import { asyncHandler } from '@/utils/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { ApiError } from '@/utils/ApiError';

const upsertSchema = z.object({
  body: z.object({ content: z.record(z.unknown()) }),
  query: z.object({}).optional(),
  params: z.object({ section: z.string().min(1) }),
});

// ── Homepage content (section-keyed JSON blocks: hero, about, cta, ...) ──
export const homepageRouter = Router();

homepageRouter.get('/', asyncHandler(async (_req, res) => {
  const sections = await prisma.homepageContent.findMany();
  return ApiResponse.success(res, sections);
}));

homepageRouter.get('/:section', asyncHandler(async (req, res) => {
  const section = await prisma.homepageContent.findUnique({ where: { section: req.params.section } });
  if (!section) throw ApiError.notFound('Homepage section not found');
  return ApiResponse.success(res, section);
}));

homepageRouter.put(
  '/:section',
  authenticate,
  requirePermission(PERMISSIONS.HOMEPAGE_MANAGE),
  validate(upsertSchema),
  asyncHandler(async (req, res) => {
    const section = await prisma.homepageContent.upsert({
      where: { section: req.params.section },
      update: { content: req.body.content },
      create: { section: req.params.section, content: req.body.content },
    });
    return ApiResponse.success(res, section, 'Homepage section saved');
  }),
);

// ── Site settings (flat key -> JSON value store) ──
export const settingsRouter = Router();

const settingUpsertSchema = z.object({
  body: z.object({ value: z.unknown() }),
  query: z.object({}).optional(),
  params: z.object({ key: z.string().min(1) }),
});

settingsRouter.get('/', asyncHandler(async (_req, res) => {
  const settings = await prisma.siteSetting.findMany();
  return ApiResponse.success(res, settings);
}));

settingsRouter.put(
  '/:key',
  authenticate,
  requirePermission(PERMISSIONS.SETTINGS_MANAGE),
  validate(settingUpsertSchema),
  asyncHandler(async (req, res) => {
    const setting = await prisma.siteSetting.upsert({
      where: { key: req.params.key },
      update: { value: req.body.value as any },
      create: { key: req.params.key, value: req.body.value as any },
    });
    return ApiResponse.success(res, setting, 'Setting saved');
  }),
);

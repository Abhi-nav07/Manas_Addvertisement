import { Router } from 'express';
import { z } from 'zod';
import prisma from '@/database/prisma';
import { uploadImage, uploadDocument } from '@/middlewares/upload.middleware';
import { storageAdapter } from '@/storage/LocalStorageAdapter';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermission } from '@/middlewares/rbac.middleware';
import { PERMISSIONS } from '@/constants/roles';
import { asyncHandler } from '@/utils/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { ApiError } from '@/utils/ApiError';
import { createCrudService } from '@/services/crudFactory';
import { createCrudController } from '@/controllers/crudFactory';
import { validate } from '@/middlewares/validate.middleware';
import { paginationQuerySchema, idParamSchema } from '@/validators/common.validator';

const router = Router();

const listSchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema.extend({ entityType: z.string().optional() }), params: z.object({}).optional() });
const idSchema = z.object({ body: z.object({}).optional(), query: z.object({}).optional(), params: idParamSchema });

/**
 * @openapi
 * /media/upload:
 *   post:
 *     summary: Upload an image (compressed + thumbnailed) or document
 *     tags: [Media]
 *     security: [{ bearerAuth: [] }]
 */
router.post(
  '/upload',
  authenticate,
  requirePermission(PERMISSIONS.MEDIA_MANAGE),
  uploadImage.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) throw ApiError.badRequest('No file provided');
    const entityType = (req.body.entityType as string) || 'general';

    const stored = await storageAdapter.saveImage(req.file.buffer, req.file.originalname, entityType);

    const mediaFile = await prisma.mediaFile.create({
      data: {
        fileName: stored.fileName,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: stored.path,
        thumbnailPath: stored.thumbnailPath,
        entityType,
        uploadedById: req.auth!.sub,
      },
    });

    return ApiResponse.created(res, mediaFile, 'File uploaded successfully');
  }),
);

router.post(
  '/upload-document',
  authenticate,
  requirePermission(PERMISSIONS.MEDIA_MANAGE),
  uploadDocument.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) throw ApiError.badRequest('No file provided');
    const entityType = (req.body.entityType as string) || 'documents';
    const stored = await storageAdapter.saveDocument(req.file.buffer, req.file.originalname, entityType);

    const mediaFile = await prisma.mediaFile.create({
      data: {
        fileName: stored.fileName,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: stored.path,
        entityType,
        uploadedById: req.auth!.sub,
      },
    });

    return ApiResponse.created(res, mediaFile, 'Document uploaded successfully');
  }),
);

const mediaService = createCrudService({ resourceName: 'MediaFile', delegate: prisma.mediaFile, searchableFields: ['originalName'] });
const mediaController = createCrudController(mediaService);

router.get('/', authenticate, requirePermission(PERMISSIONS.MEDIA_MANAGE), validate(listSchema), mediaController.list);

// Replacement: upload new file, delete old disk file, keep same DB row (same URL/id for consumers).
router.put(
  '/:id/replace',
  authenticate,
  requirePermission(PERMISSIONS.MEDIA_MANAGE),
  uploadImage.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) throw ApiError.badRequest('No file provided');
    const existing = await mediaService.getById(req.params.id);
    const stored = await storageAdapter.saveImage(req.file.buffer, req.file.originalname, existing.entityType ?? 'general');

    await storageAdapter.delete(existing.path);
    if (existing.thumbnailPath) await storageAdapter.delete(existing.thumbnailPath);

    const updated = await prisma.mediaFile.update({
      where: { id: existing.id },
      data: {
        fileName: stored.fileName,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: stored.path,
        thumbnailPath: stored.thumbnailPath,
      },
    });
    return ApiResponse.success(res, updated, 'File replaced successfully');
  }),
);

router.delete('/:id', authenticate, requirePermission(PERMISSIONS.MEDIA_MANAGE), validate(idSchema), asyncHandler(async (req, res) => {
  const existing = await mediaService.getById(req.params.id);
  await storageAdapter.delete(existing.path);
  if (existing.thumbnailPath) await storageAdapter.delete(existing.thumbnailPath);
  await mediaService.remove(req.params.id, req.auth?.sub);
  return ApiResponse.noContent(res);
}));

export default router;

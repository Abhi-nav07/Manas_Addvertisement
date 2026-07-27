import { Request, Response } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { createCrudService } from '@/services/crudFactory';

export function createCrudController(service: ReturnType<typeof createCrudService>) {
  return {
    list: asyncHandler(async (req: Request, res: Response) => {
      const { items, meta } = await service.list(req.query as any);
      return ApiResponse.success(res, items, 'Fetched successfully', 200, meta);
    }),

    getById: asyncHandler(async (req: Request, res: Response) => {
      const item = await service.getById(req.params.id);
      return ApiResponse.success(res, item);
    }),

    create: asyncHandler(async (req: Request, res: Response) => {
      const item = await service.create(req.body, req.auth?.sub);
      return ApiResponse.created(res, item);
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
      const item = await service.update(req.params.id, req.body, req.auth?.sub);
      return ApiResponse.success(res, item, 'Updated successfully');
    }),

    remove: asyncHandler(async (req: Request, res: Response) => {
      await service.remove(req.params.id, req.auth?.sub);
      return ApiResponse.noContent(res);
    }),
  };
}

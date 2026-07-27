import { z } from 'zod';
import { paginationQuerySchema, idParamSchema } from './common.validator';

const categoryBody = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),
});

export const listCategoriesSchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema, params: z.object({}).optional() });
export const createCategorySchema = z.object({ body: categoryBody, query: z.object({}).optional(), params: z.object({}).optional() });
export const updateCategorySchema = z.object({ body: categoryBody.partial(), query: z.object({}).optional(), params: idParamSchema });
export const categoryIdSchema = z.object({ body: z.object({}).optional(), query: z.object({}).optional(), params: idParamSchema });

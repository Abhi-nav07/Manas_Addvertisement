import { z } from 'zod';
import { paginationQuerySchema, idParamSchema } from './common.validator';

const serviceBody = z.object({
  title: z.string().min(2).max(150),
  slug: z.string().min(2).max(160).regex(/^[a-z0-9-]+$/, 'slug must be lowercase, alphanumeric, hyphen-separated'),
  description: z.string().min(10),
  icon: z.string().url().optional(),
  categoryId: z.string().uuid().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  order: z.number().int().optional(),
});

export const listServicesSchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema, params: z.object({}).optional() });
export const createServiceSchema = z.object({ body: serviceBody, query: z.object({}).optional(), params: z.object({}).optional() });
export const updateServiceSchema = z.object({ body: serviceBody.partial(), query: z.object({}).optional(), params: idParamSchema });
export const serviceIdSchema = z.object({ body: z.object({}).optional(), query: z.object({}).optional(), params: idParamSchema });

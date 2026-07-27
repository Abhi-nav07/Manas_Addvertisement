import { z } from 'zod';
import { paginationQuerySchema, idParamSchema } from './common.validator';

// ── Testimonials ──
const testimonialBody = z.object({
  clientName: z.string().min(2).max(100),
  clientRole: z.string().max(100).optional(),
  message: z.string().min(10),
  rating: z.number().int().min(1).max(5).optional(),
  clientId: z.string().uuid().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});
export const listTestimonialsSchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema, params: z.object({}).optional() });
export const createTestimonialSchema = z.object({ body: testimonialBody, query: z.object({}).optional(), params: z.object({}).optional() });
export const updateTestimonialSchema = z.object({ body: testimonialBody.partial(), query: z.object({}).optional(), params: idParamSchema });
export const testimonialIdSchema = z.object({ body: z.object({}).optional(), query: z.object({}).optional(), params: idParamSchema });

// ── Clients ──
const clientBody = z.object({
  name: z.string().min(2).max(100),
  logoMediaId: z.string().uuid().optional(),
  website: z.string().url().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});
export const listClientsSchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema, params: z.object({}).optional() });
export const createClientSchema = z.object({ body: clientBody, query: z.object({}).optional(), params: z.object({}).optional() });
export const updateClientSchema = z.object({ body: clientBody.partial(), query: z.object({}).optional(), params: idParamSchema });
export const clientIdSchema = z.object({ body: z.object({}).optional(), query: z.object({}).optional(), params: idParamSchema });

// ── FAQ ──
const faqBody = z.object({
  question: z.string().min(5).max(300),
  answer: z.string().min(5),
  order: z.number().int().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});
export const listFaqsSchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema, params: z.object({}).optional() });
export const createFaqSchema = z.object({ body: faqBody, query: z.object({}).optional(), params: z.object({}).optional() });
export const updateFaqSchema = z.object({ body: faqBody.partial(), query: z.object({}).optional(), params: idParamSchema });
export const faqIdSchema = z.object({ body: z.object({}).optional(), query: z.object({}).optional(), params: idParamSchema });

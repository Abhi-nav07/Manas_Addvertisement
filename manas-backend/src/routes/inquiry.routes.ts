import { z } from 'zod';
import { Router } from 'express';
import prisma from '@/database/prisma';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermission } from '@/middlewares/rbac.middleware';
import { PERMISSIONS } from '@/constants/roles';
import { validate } from '@/middlewares/validate.middleware';
import { apiLimiter } from '@/middlewares/rateLimiter.middleware';
import { asyncHandler } from '@/utils/asyncHandler';
import { ApiResponse } from '@/utils/ApiResponse';
import { normalizePagination, buildMeta } from '@/utils/pagination';
import { sendContactNotificationEmail } from '@/emails/mailer';
import { paginationQuerySchema, idParamSchema } from '@/validators/common.validator';
import { env } from '@/config/env';

const contactBody = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10),
});
const quoteBody = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional(),
  serviceInterested: z.string().max(150).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
});
const statusUpdateSchema = z.object({
  body: z.object({ status: z.enum(['NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED']) }),
  query: z.object({}).optional(),
  params: idParamSchema,
});
const listQuerySchema = z.object({ body: z.object({}).optional(), query: paginationQuerySchema, params: z.object({}).optional() });

// ── Contact enquiries ──
export const contactRouter = Router();

contactRouter.post(
  '/',
  apiLimiter,
  validate(z.object({ body: contactBody, query: z.object({}).optional(), params: z.object({}).optional() })),
  asyncHandler(async (req, res) => {
    const enquiry = await prisma.contactEnquiry.create({ data: req.body });
    // fire-and-forget notification; failures are logged, not surfaced to the submitter
    void sendContactNotificationEmail(env.SMTP_USER ?? '', enquiry);
    return ApiResponse.created(res, enquiry, 'Thanks — we will get back to you shortly');
  }),
);

contactRouter.get('/', authenticate, requirePermission(PERMISSIONS.ENQUIRIES_MANAGE), validate(listQuerySchema), asyncHandler(async (req, res) => {
  const { skip, take, page, limit, orderBy } = normalizePagination(req.query as any);
  const where = req.query.status ? { status: req.query.status as any } : {};
  const [items, total] = await Promise.all([
    prisma.contactEnquiry.findMany({ where, skip, take, orderBy }),
    prisma.contactEnquiry.count({ where }),
  ]);
  return ApiResponse.success(res, items, 'Fetched successfully', 200, buildMeta(page, limit, total));
}));

contactRouter.put('/:id/status', authenticate, requirePermission(PERMISSIONS.ENQUIRIES_MANAGE), validate(statusUpdateSchema), asyncHandler(async (req, res) => {
  const updated = await prisma.contactEnquiry.update({ where: { id: req.params.id }, data: { status: req.body.status } });
  return ApiResponse.success(res, updated, 'Status updated');
}));

// ── Quote requests ──
export const quoteRouter = Router();

quoteRouter.post(
  '/',
  apiLimiter,
  validate(z.object({ body: quoteBody, query: z.object({}).optional(), params: z.object({}).optional() })),
  asyncHandler(async (req, res) => {
    const quote = await prisma.quoteRequest.create({ data: req.body });
    return ApiResponse.created(res, quote, 'Quote request received');
  }),
);

quoteRouter.get('/', authenticate, requirePermission(PERMISSIONS.ENQUIRIES_MANAGE), validate(listQuerySchema), asyncHandler(async (req, res) => {
  const { skip, take, page, limit, orderBy } = normalizePagination(req.query as any);
  const where = req.query.status ? { status: req.query.status as any } : {};
  const [items, total] = await Promise.all([
    prisma.quoteRequest.findMany({ where, skip, take, orderBy }),
    prisma.quoteRequest.count({ where }),
  ]);
  return ApiResponse.success(res, items, 'Fetched successfully', 200, buildMeta(page, limit, total));
}));

quoteRouter.put('/:id/status', authenticate, requirePermission(PERMISSIONS.ENQUIRIES_MANAGE), validate(statusUpdateSchema), asyncHandler(async (req, res) => {
  const updated = await prisma.quoteRequest.update({ where: { id: req.params.id }, data: { status: req.body.status } });
  return ApiResponse.success(res, updated, 'Status updated');
}));

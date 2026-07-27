import { Prisma, PrismaClient } from '@prisma/client';
import { env } from '@/config/env';

// Models that support soft delete (have a `deletedAt` column).
const SOFT_DELETE_MODELS = new Set([
  'Admin', 'Category', 'Service', 'Portfolio', 'Gallery',
  'Testimonial', 'Client', 'Faq', 'MediaFile',
]);

const prisma = new PrismaClient({
  log: env.isProduction ? ['error', 'warn'] : ['error', 'warn', 'query'],
});

// Soft-delete middleware: transparently turns delete -> update, and
// filters out soft-deleted rows from find queries unless explicitly requested.
prisma.$use(async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<unknown>) => {
  if (params.model && SOFT_DELETE_MODELS.has(params.model)) {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deletedAt: new Date() };
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      params.args.data = { ...(params.args.data ?? {}), deletedAt: new Date() };
    }
    if (['findUnique', 'findFirst'].includes(params.action)) {
      params.args.where = { ...params.args.where, deletedAt: null };
    }
    if (params.action === 'findMany') {
      if (params.args.where?.deletedAt === undefined) {
        params.args.where = { ...params.args.where, deletedAt: null };
      }
    }
  }
  return next(params);
});

export default prisma;

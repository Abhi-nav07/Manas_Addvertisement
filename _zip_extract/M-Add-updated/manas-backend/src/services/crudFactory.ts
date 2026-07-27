import { ApiError } from '@/utils/ApiError';
import { normalizePagination, buildMeta, PaginationQuery } from '@/utils/pagination';
import { auditLogger } from '@/utils/logger';

// Minimal shape every Prisma delegate satisfies (Prisma.XDelegate).
interface PrismaDelegate {
  findMany: (args: any) => Promise<any[]>;
  findFirst: (args: any) => Promise<any | null>;
  count: (args: any) => Promise<number>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
}

interface CrudFactoryOptions {
  resourceName: string;
  delegate: PrismaDelegate;
  searchableFields?: string[];
  defaultSortField?: string;
  uniqueField?: string; // e.g. "slug" — checked on create/update for conflicts
}

// Builds a full Create/Read/Update/Delete service (with pagination, search,
// filter, sort) for any Prisma model. Resource-specific validation still
// happens at the Zod layer before this runs; this factory only handles
// persistence + the repeated cross-cutting concerns (404s, audit logs, conflicts).
export function createCrudService({
  resourceName, delegate, searchableFields = [], defaultSortField = 'createdAt', uniqueField,
}: CrudFactoryOptions) {
  return {
    async list(query: PaginationQuery & { status?: string; categoryId?: string }) {
      const { skip, take, page, limit, orderBy } = normalizePagination(query, defaultSortField);

      const where: Record<string, unknown> = {};
      if (query.status) where.status = query.status;
      if (query.categoryId) where.categoryId = query.categoryId;
      if (query.search && searchableFields.length) {
        where.OR = searchableFields.map((field) => ({
          [field]: { contains: query.search, mode: 'insensitive' },
        }));
      }

      const [items, total] = await Promise.all([
        delegate.findMany({ where, skip, take, orderBy }),
        delegate.count({ where }),
      ]);

      return { items, meta: buildMeta(page, limit, total) };
    },

    async getById(id: string) {
      const item = await delegate.findFirst({ where: { id } });
      if (!item) throw ApiError.notFound(`${resourceName} not found`);
      return item;
    },

    async create(data: Record<string, unknown>, adminId?: string) {
      if (uniqueField && data[uniqueField]) {
        const existing = await delegate.findFirst({ where: { [uniqueField]: data[uniqueField] } });
        if (existing) throw ApiError.conflict(`${resourceName} with this ${uniqueField} already exists`);
      }
      const created = await delegate.create({ data });
      auditLogger.info(`${resourceName.toLowerCase()}.create`, { adminId, id: created.id });
      return created;
    },

    async update(id: string, data: Record<string, unknown>, adminId?: string) {
      await this.getById(id); // 404 if missing
      if (uniqueField && data[uniqueField]) {
        const conflict = await delegate.findFirst({ where: { [uniqueField]: data[uniqueField], NOT: { id } } });
        if (conflict) throw ApiError.conflict(`${resourceName} with this ${uniqueField} already exists`);
      }
      const updated = await delegate.update({ where: { id }, data });
      auditLogger.info(`${resourceName.toLowerCase()}.update`, { adminId, id });
      return updated;
    },

    async remove(id: string, adminId?: string) {
      await this.getById(id); // 404 if missing
      await delegate.delete({ where: { id } }); // soft-deleted via Prisma middleware where applicable
      auditLogger.info(`${resourceName.toLowerCase()}.delete`, { adminId, id });
    },
  };
}

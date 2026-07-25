export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface NormalizedPagination {
  skip: number;
  take: number;
  page: number;
  limit: number;
  orderBy: Record<string, 'asc' | 'desc'>;
}

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function normalizePagination(
  query: PaginationQuery,
  defaultSortField = 'createdAt',
): NormalizedPagination {
  const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit ?? `${DEFAULT_LIMIT}`, 10) || DEFAULT_LIMIT));
  const sortBy = query.sortBy || defaultSortField;
  const sortOrder: 'asc' | 'desc' = query.sortOrder === 'asc' ? 'asc' : 'desc';

  return {
    skip: (page - 1) * limit,
    take: limit,
    page,
    limit,
    orderBy: { [sortBy]: sortOrder },
  };
}

export function buildMeta(page: number, limit: number, total: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

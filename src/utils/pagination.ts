export interface PaginationParams {
  limit: number;
  offset: number;
}

export const getPagination = (query: any): PaginationParams => {
  const limit = Math.min(Number(query.limit) || 10, 100);
  const offset = Number(query.offset) || 0;

  return { limit, offset };
};

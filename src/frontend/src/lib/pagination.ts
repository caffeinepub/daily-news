export function calculatePagination(page: number, pageSize: number) {
  const start = page * pageSize;
  return {
    start,
    count: pageSize,
  };
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

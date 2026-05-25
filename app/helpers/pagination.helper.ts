export function getPagination(page: number = 1, limit: number) {
  let currentPage = Number(page);

  if (!currentPage || currentPage < 1) {
    currentPage = 1;
  }

  const take = Number(limit);
  const skip = (currentPage - 1) * take;

  return {
    page: currentPage,
    take,
    skip,
  };
}

export function getPaginationInfo(total: number, page: number, limit: number) {
  const pages = Math.max(1, Math.ceil(total / limit));

  let safePage = page;

  if (page > pages) {
    safePage = pages;
  }

  return {
    count: total,
    pages,
    next: safePage < pages ? safePage + 1 : null,
    prev: safePage > 1 ? safePage - 1 : null,
  };
}

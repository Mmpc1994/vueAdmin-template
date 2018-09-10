export class Pagination {
  pageNo = 1;

  pageSize = 10;
}

export class UserPaginationResult<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export class PaginationResult<T> {
  data: T[];
  hasNextPage: boolean;
  pageNo: number;
  pageSize: number;
  totalCount: number;
}

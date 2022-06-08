export interface BaseResponseObject<T> {
  message: string;
  data: T;
  listData: T[];
}

export interface PaginatedBaseResponseObject<T> {
  totalElements: number;
  number: number;
  content: T[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  size: number;
}

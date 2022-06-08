import { PaginatedBaseResponseObject } from './base-response.models';
export interface BaseState<T> {
  loading: boolean;
  error: any;
  listData: T[];
  paginatedData: PaginatedBaseResponseObject<T>;
  data: T;
}

export const initialBaseState: BaseState<any> = {
  loading: false,
  error: null,
  listData: [],
  paginatedData: null,
  data: null,
} as any;

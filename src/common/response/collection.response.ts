import { PaginationResponse } from './pagination.response';

export class CollectionResponse<T> {
  pagination: PaginationResponse;

  data: T[];
}

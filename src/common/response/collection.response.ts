class PaginationResponse {
  limit: number;
  offset: number;
  total: number;
}

export class CollectionResponse<T> {
  pagination: PaginationResponse;

  data: T[];
}

class PaginationResponse {
  limit: number;
  offset: number;
}

export class CollectionResponse<T> {
  pagination: PaginationResponse;

  data: T[];

  total: number;
}

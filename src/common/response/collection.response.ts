export class PaginationResponse {
  total: number;
}
export class CollectionResponse<T> {
  pagination: PaginationResponse;

  data: T[];
}

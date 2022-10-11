import { IsOptional, Min } from 'class-validator';

export class PaginationArgs {
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @Min(0)
  @IsOptional()
  offset?: number = 0;
}

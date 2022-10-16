import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationArgs {
  @Min(1)
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @Min(0)
  @IsNumber()
  @IsOptional()
  offset?: number = 0;
}

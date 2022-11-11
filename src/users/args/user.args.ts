import { IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/common/args/pagination.args';

export class UserArgs extends PaginationArgs {
  @IsOptional()
  @IsString()
  name?: string;
}

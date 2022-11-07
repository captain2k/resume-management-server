import { IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/common/args/pagination.args';

export class ProjectArgs extends PaginationArgs {
  @IsOptional()
  @IsString()
  name?: string;
}

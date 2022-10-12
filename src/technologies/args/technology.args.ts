import { IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/common/args/pagination.args';

export class GetTechnologiesArgs extends PaginationArgs {
  @IsString()
  @IsOptional()
  name?: string;
}

import { PaginationResponse } from 'src/common/response/collection.response';
import { TechnologyEntity } from '../entities/technologies.entity';

export class TechnologyResponse extends TechnologyEntity {}

export class GetTechnologiesResponse {
  pagination: PaginationResponse;
  data: TechnologyResponse[];
}

import { CollectionResponse } from 'src/common/response/collection.response';
import { TechnologyResponse } from './technologies.response';

export class GetTechnologiesResponse extends CollectionResponse<TechnologyResponse> {
  data: TechnologyResponse[];
}

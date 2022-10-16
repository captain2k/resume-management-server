import { CollectionResponse } from 'src/common/response/collection.response';
import { TechnologyEntity } from '../entities/technology.entity';

export class GetTechnologiesResponse extends CollectionResponse<TechnologyEntity> {
  data: TechnologyEntity[];
}

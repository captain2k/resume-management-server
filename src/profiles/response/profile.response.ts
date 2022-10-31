import { CollectionResponse } from 'src/common/response/collection.response';
import { TechnologyEntity } from 'src/technologies/entities/technology.entity';
import { WorkingHistoryResponse } from 'src/working-histories/response/working-history.response';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileResponse extends ProfileEntity {
  workingHistories: WorkingHistoryResponse[];
  technologies: TechnologyEntity[];
}

export class GetProfilesResponse extends CollectionResponse<ProfileResponse> {
  data: ProfileResponse[];
}

import { CollectionResponse } from 'src/common/response/collection.response';
import { WorkingHistoryResponse } from 'src/working-histories/response/working-history.response';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileResponse extends ProfileEntity {
  workingHistory: WorkingHistoryResponse[];
}

export class GetProfilesResponse extends CollectionResponse<ProfileResponse> {
  data: ProfileResponse[];
}

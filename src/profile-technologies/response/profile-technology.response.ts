import { CollectionResponse } from 'src/common/response/collection.response';
import { ProfileTechnologyEntity } from '../entities/profile-technology.entity';

export class ProfileTechnologyResponse extends ProfileTechnologyEntity {}

export class GetProfileTechnologiesResponse extends CollectionResponse<ProfileTechnologyResponse> {
  data: ProfileTechnologyResponse[];
}

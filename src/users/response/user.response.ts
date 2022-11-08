import { CollectionResponse } from 'src/common/response/collection.response';
import { UserEntity } from '../entities/user.entity';

export class UserResponse extends UserEntity {}

export class GetUsersResponse extends CollectionResponse<UserResponse> {
  data: UserResponse[];
}

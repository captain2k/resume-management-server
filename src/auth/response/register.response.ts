import { Token } from '../entities/token.entity';

class UserEntity {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
}

export class ResgisterResponse {
  user: UserEntity;
  token: Token;
}

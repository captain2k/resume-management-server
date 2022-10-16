import { Roles } from '@prisma/client';
import { Token } from '../entities/token.entity';

class UserEntity {
  id: string;

  firstName: string;
  lastName: string;

  email: string;

  role: Roles;
}

export class ResgisterResponse {
  user: UserEntity;
  token: Token;
}

import { Roles, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: string;

  email: string;
  @Exclude()
  password: string;

  lastName: string;
  firstName: string;

  role: Roles;
}

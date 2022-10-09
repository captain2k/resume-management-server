import { Exclude } from 'class-transformer';

export class ResgisterResponse {
  id: string;

  firstName: string;
  lastName: string;

  email: string;

  @Exclude()
  password: string;
}

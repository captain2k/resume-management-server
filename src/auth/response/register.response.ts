import { Exclude } from 'class-transformer';

export class ResgisterResponse {
  id: number;

  firstName: string;
  lastName: string;

  email: string;

  @Exclude()
  password: string;
}
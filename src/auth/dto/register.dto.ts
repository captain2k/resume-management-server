import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Roles } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
  email: string;

  @IsNotEmpty()
  password: string;

  lastName: string;
  firstName: string;

  role: Roles;
}

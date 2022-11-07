import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Roles, User } from '@prisma/client';
import { Token } from '../entities/token.entity';

export class RegisterDto
  implements Omit<User, 'id' | 'createdAt' | 'updateAt'>
{
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, {
    message:
      'Password must has at least 8-16 characters and contains digit, lower case and upper case characters',
  })
  password: string;

  @IsString()
  lastName: string;
  @IsString()
  firstName: string;

  @IsEnum([Roles.DEV, Roles.HR])
  role: Roles;
}

export class LoginDto implements Pick<User, 'email' | 'password'> {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto implements Pick<Token, 'refreshToken'> {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

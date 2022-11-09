import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto
  implements Partial<Pick<UserEntity, 'firstName' | 'lastName'>>
{
  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  firstName?: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, {
    message:
      'Password must has at least 8-16 characters and contains digit, lower case and upper case characters',
  })
  newPassword: string;
}

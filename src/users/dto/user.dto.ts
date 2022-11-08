import { IsOptional, IsString } from 'class-validator';
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

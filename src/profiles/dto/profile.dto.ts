import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProfileEntity } from '../entities/profile.entity';

export class CreateProfileDto implements Omit<ProfileEntity, 'id'> {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  introduction: string | null;
}

export class UpdateProfileDto
  implements Partial<Omit<ProfileEntity, 'id' | 'userId'>>
{
  @IsOptional()
  @IsString()
  introduction?: string;
}

import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProfileTechnologyEntity } from '../entities/profile-technology.entity';

export class CreateProfileTechnologyDto
  implements Omit<ProfileTechnologyEntity, 'id'>
{
  @IsNumber()
  @IsNotEmpty()
  yoe: number;

  @IsString()
  @IsNotEmpty()
  profileId: string;

  @IsString()
  @IsNotEmpty()
  technologyId: string;
}

export class UpdateProfileTechnologyDto
  implements Partial<Omit<ProfileTechnologyEntity, 'profileId' | 'id'>>
{
  @IsString()
  @IsOptional()
  technologyId?: string;

  @IsNumber()
  @IsOptional()
  yoe?: number;
}

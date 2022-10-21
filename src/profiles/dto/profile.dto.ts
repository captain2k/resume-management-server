import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  introduction: string;
}

export class UpdateProfileDto extends OmitType(CreateProfileDto, ['userId']) {}

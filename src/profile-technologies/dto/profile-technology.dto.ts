import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfileTechnologyDto {
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

export class UpdateProfileTechnologyDto extends PartialType(
  CreateProfileTechnologyDto,
) {}

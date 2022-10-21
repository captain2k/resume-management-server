import { PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkingHistoryDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  responsibilities?: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  profileId: string;

  @IsString({ each: true })
  @IsOptional()
  technologyIds?: string[];
}

export class UpdateWorkingHistoryDto {
  @IsOptional()
  @IsString()
  role?: string;

  @IsString()
  @IsOptional()
  responsibilities?: string;

  @IsString({ each: true })
  @IsOptional()
  technologyIds?: string[];
}

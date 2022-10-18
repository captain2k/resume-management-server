import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkingHistoryDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  responsibilities?: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;
  @IsOptional()
  @IsDate()
  updateAt: Date;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateWorkingHistoryDto extends PartialType(
  CreateWorkingHistoryDto,
) {}

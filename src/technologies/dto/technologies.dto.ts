import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologiesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateTechnologiesDto extends PartialType(CreateTechnologiesDto) {}

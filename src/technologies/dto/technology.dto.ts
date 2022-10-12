import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateTechnologyDto {
  @IsOptional()
  @IsString()
  name?: string;
}

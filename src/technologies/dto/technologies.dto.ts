import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologiesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

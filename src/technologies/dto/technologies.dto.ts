import { IsNotEmpty, IsString } from 'class-validator';

export class TechnologiesDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

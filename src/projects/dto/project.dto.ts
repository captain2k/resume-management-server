import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectEntity } from '../entities/project.entity';

export class CreateProjectDto
  implements Omit<ProjectEntity, 'id' | 'createdAt' | 'updateAt'>
{
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsOptional()
  startDate: Date | null;

  @IsDate()
  @IsOptional()
  endDate: Date | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsString({ each: true })
  @IsOptional()
  technologyIds?: string[];
}

export class UpdateProjectDto
  implements Partial<Omit<ProjectEntity, 'id' | 'createdAt' | 'updateAt'>>
{
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsString({ each: true })
  @IsOptional()
  technologyIds?: string[];
}

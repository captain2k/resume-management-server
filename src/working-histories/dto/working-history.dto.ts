import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WorkingHistoryEntity } from '../entities/working-history.entities';

export class CreateWorkingHistoryDto
  implements Omit<WorkingHistoryEntity, 'id' | 'createdAt' | 'updateAt'>
{
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  responsibilities: string | null;

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

export class UpdateWorkingHistoryDto
  implements Partial<Pick<WorkingHistoryEntity, 'role' | 'responsibilities'>>
{
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

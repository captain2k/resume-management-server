import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TechnologyEntity } from '../entities/technology.entity';

export class CreateTechnologyDto implements Pick<TechnologyEntity, 'name'> {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateTechnologyDto
  implements Partial<Pick<TechnologyEntity, 'name'>>
{
  @IsOptional()
  @IsString()
  name?: string;
}

import { PartialType } from '@nestjs/swagger';
import { CreateTechnologiesDto } from './technologies.dto';

export class UpdateTechnologiesDto extends PartialType(CreateTechnologiesDto) {}

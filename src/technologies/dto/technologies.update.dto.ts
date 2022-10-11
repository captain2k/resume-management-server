import { PartialType } from '@nestjs/swagger';
import { TechnologiesDto } from './technologies.dto';

export class UpdateTechnologiesDto extends PartialType(TechnologiesDto) {}

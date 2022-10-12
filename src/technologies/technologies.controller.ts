import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetTechnologiesArgs } from './args/technology.args';
import { CreateTechnologyDto, UpdateTechnologyDto } from './dto/technology.dto';
import { TechnologyEntity } from './entities/technology.entity';
import { GetTechnologiesResponse } from './response/technology.response';
import { TechnologiesService } from './technologies.service';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologyService: TechnologiesService) {}

  @Post()
  create(@Body() dto: CreateTechnologyDto): Promise<TechnologyEntity> {
    return this.technologyService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTechnologyDto,
  ): Promise<TechnologyEntity> {
    return this.technologyService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.technologyService.delete(id);
  }

  @Get()
  getMany(
    @Query() query: GetTechnologiesArgs,
  ): Promise<GetTechnologiesResponse> {
    return this.technologyService.getMany(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<TechnologyEntity> {
    return this.technologyService.getOne(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { GetTechnologiesArgs } from './args/technology.args';
import { CreateTechnologyDto, UpdateTechnologyDto } from './dto/technology.dto';
import { TechnologyEntity } from './entities/technology.entity';
import { GetTechnologiesResponse } from './response/technology.response';
import { TechnologiesService } from './technologies.service';
import { Roles as PRoles } from '@prisma/client';

@Controller('technologies')
@ApiTags('Technology')
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
  @Roles(PRoles.ADMIN)
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

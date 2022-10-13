import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProjectArgs } from './args/project.args';
import { CreateProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.projectService.getOne(id);
  }

  @Get()
  getMany(@Query() query: ProjectArgs) {
    return this.projectService.getMany(query);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }
}

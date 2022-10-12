import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.projectService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }
}

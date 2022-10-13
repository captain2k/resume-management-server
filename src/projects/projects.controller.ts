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
import { ProjectArgs } from './args/project.args';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { ProjectsService } from './projects.service';
import {
  GetProjectResponse,
  ProjectResponse,
} from './response/project.response';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ProjectResponse> {
    return this.projectService.getOne(id);
  }

  @Get()
  getMany(@Query() query: ProjectArgs): Promise<GetProjectResponse> {
    return this.projectService.getMany(query);
  }

  @Post()
  create(@Body() dto: CreateProjectDto): Promise<ProjectResponse> {
    return this.projectService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ): Promise<ProjectResponse> {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.projectService.delete(id);
  }
}

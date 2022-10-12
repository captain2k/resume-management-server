import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) throw new NotFoundException('Project does not exist');

    return project;
  }

  async create(dto: CreateProjectDto) {
    await this.prisma.project.create({
      data: {
        ...dto,
      },
    });
  }
}

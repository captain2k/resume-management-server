import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { ProjectArgs } from './args/project.args';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import {
  GetProjectResponse,
  ProjectResponse,
} from './response/project.response';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(projectId: string): Promise<ProjectResponse> {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        technologyProject: {
          select: {
            technology: true,
          },
        },
      },
    });

    if (!project) throw new NotFoundException('Project does not exist');

    const { technologyProject, ...rest } = project;

    return {
      ...rest,
      technologies: technologyProject.map((item) => item.technology),
    };
  }

  async getMany(query: ProjectArgs): Promise<GetProjectResponse> {
    const { limit, name: title, offset } = query;
    const where: Prisma.ProjectWhereInput = {
      title: {
        contains: title,
        mode: 'insensitive',
      },
    };

    const [total, projects] = await this.prisma.$transaction([
      this.prisma.project.count({
        where,
      }),

      this.prisma.project.findMany({
        where,
        skip: offset,
        take: limit,
        include: {
          technologyProject: {
            select: {
              technology: true,
            },
          },
        },
      }),
    ]);

    const projectList = projects.map((item) => {
      const { technologyProject, ...rest } = item;
      return {
        ...rest,
        technologies: technologyProject.map((item) => item.technology),
      };
    });

    return {
      data: projectList,
      pagination: {
        limit,
        offset,
        total,
      },
    };
  }

  async create(dto: CreateProjectDto): Promise<ProjectResponse> {
    const { technologyIds, ...rest } = dto;

    const results = await this.prisma.$transaction(async (transaction) => {
      const project = await transaction.project.create({
        data: {
          ...rest,
        },
      });

      await transaction.technologyProject.createMany({
        data: technologyIds.map((item) => {
          return {
            projectId: project.id,
            technologyId: item,
          };
        }),
        skipDuplicates: true,
      });

      const technologies = await transaction.technology.findMany({
        where: {
          id: { in: technologyIds },
        },
      });

      return {
        ...project,
        technologies,
      };
    });

    return results;
  }

  async update(
    projectId: string,
    dto: UpdateProjectDto,
  ): Promise<ProjectResponse> {
    await this.getOne(projectId);
    const results = await this.prisma.$transaction(async (transaction) => {
      const { technologyIds, ...rest } = dto;

      await transaction.project.update({
        where: {
          id: projectId,
        },
        data: {
          ...rest,
        },
      });

      // await transaction.technologyProject.updateMany({
      //   where: {
      //     projectId,
      //   },
      //   data: {
      //     technologyId: technologyIds.map((item) => item),
      //   },
      // });
    });

    return;
  }

  async delete(projectId: string): Promise<boolean> {
    await this.getOne(projectId);

    const result = await this.prisma.$transaction(async (transaction) => {
      await transaction.technologyProject.deleteMany({
        where: {
          projectId,
        },
      });
      await transaction.project.delete({ where: { id: projectId } });

      return true;
    });

    return result;
  }

  // private async findTechnologyProjectId(id: string): Promise<string> {
  //   const technologyProject = await this.prisma.technologyProject.findFirst({
  //     where: {
  //       projectId: id,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   });
  //   console.log(technologyProject);

  //   return technologyProject.id;
  // }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { TechnologiesService } from 'src/technologies/technologies.service';
import { ProjectArgs } from './args/project.args';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import {
  GetProjectResponse,
  ProjectResponse,
} from './response/project.response';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly technologiesService: TechnologiesService,
  ) {}

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

    if (!project) throw new BadRequestException('Project does not exist');

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
        data: rest,
      });

      let technologies = [];

      if (technologyIds && technologyIds.length > 0) {
        technologies = await this.technologiesService.checkExistTechIds(
          technologyIds,
          transaction,
        );

        await transaction.technologyProject.createMany({
          data: technologyIds.map((item) => {
            return {
              projectId: project.id,
              technologyId: item,
            };
          }),
          skipDuplicates: true,
        });
      }

      return {
        ...project,
        technologies,
      };
    });

    return results;
  }

  async update(projectId: string, dto: UpdateProjectDto) {
    const currentProject = await this.getOne(projectId);
    let technologies = currentProject.technologies;

    const { technologyIds, ...rest } = dto;

    return this.prisma.$transaction(async (transaction) => {
      if (Array.isArray(technologyIds)) {
        technologies = await this.technologiesService.checkExistTechIds(
          technologyIds,
          transaction,
        );

        await transaction.technologyProject.deleteMany({
          where: {
            AND: [
              {
                projectId,
              },
              {
                technologyId: {
                  notIn: technologyIds,
                },
              },
            ],
          },
        });

        const old = await transaction.technologyProject.findMany({
          where: {
            projectId,
          },
          select: {
            technologyId: true,
          },
        });

        const oldTechnologyIds = old.map((item) => item.technologyId);

        const newTechnologyIds = technologyIds.filter(
          (item) => !oldTechnologyIds.includes(item),
        );

        await transaction.technologyProject.createMany({
          data: newTechnologyIds.map((item) => {
            return {
              projectId,
              technologyId: item,
            };
          }),
        });
      }

      const project = await transaction.project.update({
        where: {
          id: projectId,
        },
        data: rest,
      });

      return {
        ...project,
        technologies,
      };
    });
  }

  async delete(projectId: string): Promise<boolean> {
    await this.getOne(projectId);

    await this.prisma.project.delete({ where: { id: projectId } });

    return true;
  }
}

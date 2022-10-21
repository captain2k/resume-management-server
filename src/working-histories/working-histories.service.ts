import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';
import { TechnologiesService } from 'src/technologies/technologies.service';
import { UsersService } from 'src/users/users.service';
import { GetWorkingHistoryArgs } from './args/working-history.args';
import {
  CreateWorkingHistoryDto,
  UpdateWorkingHistoryDto,
} from './dto/working-history.dto';
import {
  GetWorkingHistoryRespose,
  WorkingHistoryResponse,
} from './response/working-history.response';

@Injectable()
export class WorkingHistoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly technologyService: TechnologiesService,
    private readonly projectService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  async getOne(id: string): Promise<WorkingHistoryResponse> {
    const workingHistory = await this.prisma.workingHistory.findUnique({
      where: {
        id,
      },
      include: {
        project: {
          include: {
            technologyProject: {
              select: {
                technology: true,
              },
            },
          },
        },
        workingHistoryTechnology: {
          select: {
            technology: true,
          },
        },
      },
    });

    if (!workingHistory)
      throw new NotFoundException('Working history does not exist');

    const { technologyProject, ...rest } = workingHistory.project;
    const { workingHistoryTechnology, ...restWorkingHistory } = workingHistory;

    return {
      ...restWorkingHistory,
      project: {
        ...rest,
        technologies: technologyProject.map((item) => item.technology),
      },
      technologies: workingHistoryTechnology.map((item) => item.technology),
    };
  }

  async getMany(
    query: GetWorkingHistoryArgs,
  ): Promise<GetWorkingHistoryRespose> {
    const { limit, offset } = query;

    const [total, workingHistories] = await this.prisma.$transaction([
      this.prisma.workingHistory.count(),
      this.prisma.workingHistory.findMany({
        skip: offset,
        take: limit,
        include: {
          project: {
            include: {
              technologyProject: {
                select: {
                  technology: true,
                },
              },
            },
          },
          workingHistoryTechnology: {
            select: {
              technology: true,
            },
          },
        },
      }),
    ]);

    const formatWorkingHistories = workingHistories.map((item) => {
      const { technologyProject, ...rest } = item.project;
      const { workingHistoryTechnology, ...restWorkingHistory } = item;

      return {
        ...restWorkingHistory,
        project: {
          ...rest,
          technologies: technologyProject.map((item) => item.technology),
        },
        technologies: workingHistoryTechnology.map((item) => item.technology),
      };
    });

    return {
      data: formatWorkingHistories,
      pagination: {
        limit,
        offset,
        total,
      },
    };
  }

  async create(dto: CreateWorkingHistoryDto): Promise<WorkingHistoryResponse> {
    const { technologyIds, ...rest } = dto;

    return this.prisma.$transaction(async (transaction) => {
      // Check project exist
      await this.projectService.getOne(rest.projectId);

      const workingHistory = await transaction.workingHistory.create({
        data: rest,
        include: {
          project: {
            include: {
              technologyProject: {
                select: {
                  technology: true,
                },
              },
            },
          },
        },
      });

      const { technologyProject, ...restProject } = workingHistory.project;

      if (Array.isArray(technologyIds) && technologyIds.length > 0) {
        const technologies = await this.technologyService.checkExistTechIds(
          technologyIds,
          transaction,
        );

        await transaction.workingHistoryTechnology.createMany({
          data: technologyIds.map((item) => {
            return {
              workingHistoryId: workingHistory.id,
              technologyId: item,
            };
          }),
          skipDuplicates: true,
        });

        return {
          ...workingHistory,
          project: {
            ...restProject,
            technologies: technologyProject.map((item) => item.technology),
          },
          technologies,
        };
      }

      return {
        ...workingHistory,
        project: {
          ...restProject,
          technologies: technologyProject.map((item) => item.technology),
        },
        technologies: [],
      };
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.getOne(id);

    await this.prisma.workingHistory.delete({ where: { id } });

    return true;
  }

  async update(
    id: string,
    dto: UpdateWorkingHistoryDto,
  ): Promise<WorkingHistoryResponse> {
    const currentWorkingHistory = await this.getOne(id);
    let technologies = currentWorkingHistory.technologies;

    const { technologyIds, ...rest } = dto;

    return await this.prisma.$transaction(async (transaction) => {
      if (Array.isArray(technologyIds)) {
        technologies = await this.technologyService.checkExistTechIds(
          technologyIds,
          transaction,
        );
        await transaction.workingHistoryTechnology.deleteMany({
          where: {
            workingHistoryId: id,
            technologyId: { notIn: technologyIds },
          },
        });
        const oldTechnologies =
          await transaction.workingHistoryTechnology.findMany({
            where: {
              workingHistoryId: id,
            },
            include: {
              technology: {
                include: {
                  workingHistoryTechnology: {
                    select: {
                      technology: true,
                    },
                  },
                },
              },
            },
          });

        const oldTechnologiesIds = oldTechnologies.map(
          (item) => item.technology.id,
        );

        const newTechnologiesIds = technologyIds.filter(
          (item) => !oldTechnologiesIds.includes(item),
        );

        await transaction.workingHistoryTechnology.createMany({
          data: newTechnologiesIds.map((item) => {
            return {
              technologyId: item,
              workingHistoryId: id,
            };
          }),
        });
      }

      const workingHistory = await transaction.workingHistory.update({
        where: {
          id,
        },
        data: rest,
      });

      return {
        ...workingHistory,
        project: currentWorkingHistory.project,
        technologies,
      };
    });
  }
}

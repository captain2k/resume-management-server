import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { TechnologiesService } from 'src/technologies/technologies.service';
import { GetWorkingHistoryArgs } from './args/workingHistory.args';
import {
  CreateWorkingHistoryDto,
  UpdateWorkingHistoryDto,
} from './dto/workingHistory.dto';
import {
  GetWorkingHistoryRespose,
  WorkingHistoryResponse,
} from './response/workingHistory.response';

@Injectable()
export class WorkingHistoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly technologyService: TechnologiesService,
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
    console.log(technologyProject);

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
    return;
  }

  async create(dto: CreateWorkingHistoryDto): Promise<WorkingHistoryResponse> {
    const { technologyIds, ...rest } = dto;

    return this.prisma.$transaction(async (transaction) => {
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
    return;
  }

  async update(
    id: string,
    dto: UpdateWorkingHistoryDto,
  ): Promise<WorkingHistoryResponse> {
    return;
  }
}

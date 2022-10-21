import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ProfileArgs } from './args/profile.args';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import {
  GetProfileResponse,
  ProfileResponse,
} from './response/profile.response';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: string): Promise<ProfileResponse> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: {
        workingHistory: {
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
        },
      },
    });

    if (!profile) throw new NotFoundException('Profile does not exist');

    const formatProfile = profile.workingHistory.map((item) => {
      const { project, workingHistoryTechnology, ...restItem } = item;
      const { technologyProject, ...restProject } = project;
      return {
        ...restItem,
        project: {
          ...restProject,
          technologies: technologyProject.map((item) => item.technology),
        },
        technologies: workingHistoryTechnology.map((item) => item.technology),
      };
    });

    return {
      ...profile,
      workingHistory: formatProfile,
    };
  }

  async getMany(query: ProfileArgs): Promise<GetProfileResponse> {
    const { limit, offset } = query;

    const [total, profiles] = await this.prisma.$transaction([
      this.prisma.profile.count(),
      this.prisma.profile.findMany({
        skip: offset,
        take: limit,
        include: {
          workingHistory: {
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
          },
        },
      }),
    ]);

    let formatProfile = [];

    profiles.forEach((item) => {
      formatProfile = item.workingHistory.map((item) => {
        const { project, workingHistoryTechnology, ...restItem } = item;
        const { technologyProject, ...restProject } = project;
        return {
          ...restItem,
          project: {
            ...restProject,
            technologies: technologyProject.map((item) => item.technology),
          },
          technologies: workingHistoryTechnology.map((item) => item.technology),
        };
      });
    });

    return {
      data: formatProfile,
      pagination: {
        limit,
        offset,
        total,
      },
    };
  }

  async create(dto: CreateProfileDto) {
    return;
  }

  async update(id: string, dto: UpdateProfileDto) {
    return;
  }

  async delete(id: string) {
    return;
  }
}

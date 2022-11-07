import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ProfileArgs } from './args/profile.args';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import {
  GetProfilesResponse,
  ProfileResponse,
} from './response/profile.response';

const include = Prisma.validator<Prisma.ProfileInclude>()({
  workingHistories: {
    include: {
      project: {
        include: {
          technologyProjects: {
            select: {
              technology: true,
            },
          },
        },
      },
      workingHistoryTechnologies: {
        select: {
          technology: true,
        },
      },
    },
  },
});

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async getOne(id: string): Promise<ProfileResponse> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: include,
    });

    if (!profile) throw new NotFoundException('Profile does not exist');

    const formatedWorkingHistories = profile.workingHistories.map((item) => {
      const { project, workingHistoryTechnologies, ...restWorkingHistory } =
        item;
      const { technologyProjects, ...restProject } = project;
      return {
        ...restWorkingHistory,
        project: {
          ...restProject,
          technologies: technologyProjects.map((item) => item.technology),
        },
        technologies: workingHistoryTechnologies.map((item) => item.technology),
      };
    });

    return {
      ...profile,
      workingHistory: formatedWorkingHistories,
    };
  }

  async getMany(query: ProfileArgs): Promise<GetProfilesResponse> {
    const { limit, offset } = query;

    const [total, profiles] = await this.prisma.$transaction([
      this.prisma.profile.count(),
      this.prisma.profile.findMany({
        skip: offset,
        take: limit,
        include,
      }),
    ]);

    const formatedProfiles = profiles.map((item) => {
      const { workingHistories, ...rest } = item;

      return {
        ...rest,
        workingHistory: workingHistories.map((item) => {
          const { project, workingHistoryTechnologies, ...restWorkingHistory } =
            item;
          const { technologyProjects, ...restProject } = project;
          return {
            ...restWorkingHistory,
            project: {
              ...restProject,
              technologies: technologyProjects.map((item) => item.technology),
            },
            technologies: workingHistoryTechnologies.map(
              (item) => item.technology,
            ),
          };
        }),
      };
    });

    return {
      data: formatedProfiles,
      pagination: {
        limit,
        offset,
        total,
      },
    };
  }

  async create(dto: CreateProfileDto): Promise<ProfileEntity> {
    await this.usersService.getOne(dto.userId);

    const profile = await this.prisma.profile.create({
      data: dto,
    });

    return profile;
  }

  async update(id: string, dto: UpdateProfileDto): Promise<ProfileEntity> {
    await this.getOne(id);

    const profile = await this.prisma.profile.update({
      where: {
        id,
      },
      data: dto,
    });

    return profile;
  }

  async delete(id: string): Promise<boolean> {
    await this.getOne(id);

    await this.prisma.profile.delete({
      where: { id },
    });
    return true;
  }

  async clone(profileId: string): Promise<ProfileEntity> {
    return this.prisma.$transaction(async (transaction) => {
      const rootProfile = await transaction.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          workingHistories: true,
        },
      });

      const cloneProfile = await transaction.profile.create({
        data: {
          userId: rootProfile.userId,
          introduction: rootProfile.introduction,
        },
      });

      await transaction.workingHistory.createMany({
        data: rootProfile.workingHistories.map((item) => {
          const { id: rootId, ...rest } = item;
          return {
            ...rest,
            profileId: cloneProfile.id,
          };
        }),
      });

      return cloneProfile;
    });
  }
}

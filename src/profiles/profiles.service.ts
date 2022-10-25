import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ProfileArgs } from './args/profile.args';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import {
  GetProfileResponse,
  ProfileResponse,
} from './response/profile.response';

const include = Prisma.validator<Prisma.ProfileInclude>()({
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
        include,
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
    return await this.prisma.$transaction(async (transaction) => {
      const oldProfile = await transaction.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          workingHistory: true,
        },
      });

      const cloneProfile = await transaction.profile.create({
        data: {
          userId: oldProfile.userId,
          introduction: oldProfile.introduction,
        },
      });

      await transaction.workingHistory.createMany({
        data: oldProfile.workingHistory.map((item) => {
          const { id: rootId, profileId: rootProfileId, ...rest } = item;
          return {
            ...rest,
            profileId,
          };
        }),
      });

      return cloneProfile;
    });
  }
}

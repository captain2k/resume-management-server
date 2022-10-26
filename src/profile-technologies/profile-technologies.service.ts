import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { TechnologiesService } from 'src/technologies/technologies.service';
import { ProfileTechnologyArgs } from './args/profile-technology.args';
import {
  CreateProfileTechnologyDto,
  UpdateProfileTechnologyDto,
} from './dto/profile-technology.dto';
import {
  GetProfileTechnologiesResponse,
  ProfileTechnologyResponse,
} from './response/profile-technology.response';

@Injectable()
export class ProfileTechnologiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfilesService,
    private readonly technologyService: TechnologiesService,
  ) {}

  async getOne(id: string): Promise<ProfileTechnologyResponse> {
    const profileTechnology = await this.prisma.profileTechnology.findUnique({
      where: {
        id,
      },
    });

    if (!profileTechnology)
      throw new NotFoundException('Profile technology does not exist');

    return profileTechnology;
  }

  async getMany(
    query: ProfileTechnologyArgs,
  ): Promise<GetProfileTechnologiesResponse> {
    const { limit, offset } = query;

    const [total, profileTechnologies] = await this.prisma.$transaction([
      this.prisma.profileTechnology.count(),
      this.prisma.profileTechnology.findMany({
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      data: profileTechnologies,
      pagination: {
        limit,
        offset,
        total,
      },
    };
  }

  async create(
    dto: CreateProfileTechnologyDto,
  ): Promise<ProfileTechnologyResponse> {
    const { profileId, technologyId } = dto;

    await this.profileService.getOne(profileId);
    await this.technologyService.getOne(technologyId);

    const profileTechnology = await this.prisma.profileTechnology.create({
      data: dto,
    });

    return profileTechnology;
  }

  async update(
    id: string,
    dto: UpdateProfileTechnologyDto,
  ): Promise<ProfileTechnologyResponse> {
    await this.getOne(id);
    await this.technologyService.getOne(dto.technologyId);

    const profileTechnology = await this.prisma.profileTechnology.update({
      where: { id },
      data: dto,
    });

    return profileTechnology;
  }

  async delete(id: string): Promise<boolean> {
    await this.getOne(id);

    await this.prisma.profileTechnology.delete({ where: { id } });

    return true;
  }
}

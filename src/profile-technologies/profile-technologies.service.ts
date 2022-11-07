import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { TechnologiesService } from 'src/technologies/technologies.service';
import {
  CreateProfileTechnologyDto,
  UpdateProfileTechnologyDto,
} from './dto/profile-technology.dto';
import { ProfileTechnologyResponse } from './response/profile-technology.response';

@Injectable()
export class ProfileTechnologiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfilesService,
    private readonly technologyService: TechnologiesService,
  ) {}

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
}

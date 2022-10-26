import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
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
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: string): Promise<ProfileTechnologyResponse> {
    return;
  }

  async getMany(
    query: ProfileTechnologyArgs,
  ): Promise<GetProfileTechnologiesResponse> {
    return;
  }

  async create(
    dto: CreateProfileTechnologyDto,
  ): Promise<ProfileTechnologyResponse> {
    return;
  }

  async update(
    id: string,
    dto: UpdateProfileTechnologyDto,
  ): Promise<ProfileTechnologyResponse> {
    return;
  }

  async delete(id: string): Promise<boolean> {
    return;
  }
}

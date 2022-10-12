import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { GetTechnologiesArgs } from './args/get-technologies.args';
import { CreateTechnologiesDto } from './dto/technologies.dto';
import { UpdateTechnologiesDto } from './dto/technologies.dto';
import { TechnologyEntity } from './entities/technologies.entity';
import { GetTechnologiesResponse } from './response/technologies.response';

@Injectable()
export class TechnologiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: string): Promise<TechnologyEntity> {
    const technology = await this.prisma.technology.findUnique({
      where: {
        id,
      },
    });

    if (!technology) throw new NotFoundException('Technology is not exist');
    return technology;
  }

  async create(dto: CreateTechnologiesDto): Promise<TechnologyEntity> {
    const checkTechnologyName = await this.prisma.technology.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (checkTechnologyName)
      throw new ConflictException('Technology has been exist');

    return this.prisma.technology.create({
      data: {
        ...dto,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateTechnologiesDto,
  ): Promise<TechnologyEntity> {
    // Check technology exist
    this.getOne(id);

    const uniqueName = await this.prisma.technology.findFirst({
      where: {
        name: dto.name,
      },
    });

    if (uniqueName) throw new ConflictException('Tech is exist');

    return this.prisma.technology.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    // Check technology exist
    this.getOne(id);

    await this.prisma.technology.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async getMany(query: GetTechnologiesArgs): Promise<GetTechnologiesResponse> {
    const { limit: take, offset: skip, name } = query;

    const where: Prisma.TechnologyWhereInput = {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    };

    const [total, technologies] = await this.prisma.$transaction([
      this.prisma.technology.count({
        where,
      }),
      this.prisma.technology.findMany({
        where,
        skip,
        take,
      }),
    ]);
    return {
      pagination: {
        total,
      },
      data: technologies,
    };
  }
}

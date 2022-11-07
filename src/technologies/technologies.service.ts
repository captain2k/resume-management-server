import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { GetTechnologiesArgs } from './args/technology.args';
import { CreateTechnologyDto, UpdateTechnologyDto } from './dto/technology.dto';
import { TechnologyEntity } from './entities/technology.entity';
import { GetTechnologiesResponse } from './response/technology.response';

@Injectable()
export class TechnologiesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: string): Promise<TechnologyEntity> {
    const technology = await this.prisma.technology.findUnique({
      where: {
        id,
      },
    });

    if (!technology) throw new NotFoundException('Technology does not exist');

    return technology;
  }

  async create(dto: CreateTechnologyDto): Promise<TechnologyEntity> {
    await this.checkDuplicateName(dto.name);

    return this.prisma.technology.create({
      data: {
        ...dto,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateTechnologyDto,
  ): Promise<TechnologyEntity> {
    const technology = await this.getOne(id);

    if (dto.name && technology.name !== dto.name) {
      await this.checkDuplicateName(dto.name);
    }

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
    await this.getOne(id);

    await this.prisma.technology.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async getMany(query: GetTechnologiesArgs): Promise<GetTechnologiesResponse> {
    const { limit, offset, name } = query;
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
        skip: offset,
        take: limit,
      }),
    ]);
    return {
      pagination: {
        limit,
        offset,
        total,
      },
      data: technologies,
    };
  }
  private async checkDuplicateName(name: string): Promise<void> {
    const checkTechnologyName = await this.prisma.technology.findUnique({
      where: {
        name,
      },
    });

    if (checkTechnologyName)
      throw new ConflictException('Technology name has already existed');
  }

  async checkExistTechIds(
    techIds: string[],
    transaction: Prisma.TransactionClient = this.prisma,
  ) {
    const technologies = await transaction.technology.findMany({
      where: {
        id: { in: techIds },
      },
    });

    if (technologies.length !== techIds.length)
      throw new NotFoundException('At least one technology does not exist');
    return technologies;
  }
}

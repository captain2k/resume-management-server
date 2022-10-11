import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { GetTechnologiesArgs } from './args/get-technologies.args';
import { CreateTechnologiesDto } from './dto/technologies.dto';
import { UpdateTechnologiesDto } from './dto/technologies.update.dto';
import { TechnologyEntity } from './entities/technologies.entity';
import { GetTechnologiesResponse } from './response/get-technologies.response';

@Injectable()
export class TechnologiesService {
  constructor(private readonly prisma: PrismaService) {}

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
    const techExist = await this.prisma.technology.findUnique({
      where: {
        id,
      },
    });
    if (!techExist) throw new NotFoundException('Tech is not exist');

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
    const technologyExist = await this.prisma.technology.findUnique({
      where: {
        id,
      },
    });
    if (!technologyExist) throw new NotFoundException('Tech is not exist');

    await this.prisma.technology.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async getMany(query: GetTechnologiesArgs): Promise<GetTechnologiesResponse> {
    const { limit: take, offset: skip, name } = query;

    const [total, technologies] = await this.prisma.$transaction([
      this.prisma.technology.count(),
      this.prisma.technology.findMany({
        where: {
          name: {
            search: name,
          },
        },
        skip: +skip,
        take: +take,
      }),
    ]);
    console.log(take, total);

    return {
      pagination: {
        total,
        totalPage: Math.ceil(total / take),
      },
      data: technologies,
    };
  }

  async getOne(id: string): Promise<TechnologyEntity> {
    const technology = await this.prisma.technology.findUnique({
      where: {
        id,
      },
    });

    if (!technology) throw new NotFoundException('Technology is not exist');
    return technology;
  }
}

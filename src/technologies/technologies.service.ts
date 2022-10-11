import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { GetTechnologiesArgs } from './args/get-technologies.args';
import { TechnologiesDto } from './dto/technologies.dto';
import { UpdateTechnologiesDto } from './dto/technologies.update.dto';
import { TechnologyEntity } from './entities/technologies.entity';
import { GetTechnologiesResponse } from './response/get-technologies.response';

@Injectable()
export class TechnologiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: TechnologiesDto): Promise<TechnologyEntity> {
    if (dto.name) {
      const checkTechnologyName = await this.prisma.technology.findUnique({
        where: {
          name: dto.name,
        },
      });

      if (checkTechnologyName)
        throw new ConflictException('Technology has been exist');

      const technology = await this.prisma.technology.create({
        data: {
          ...dto,
        },
      });
      console.log(technology);

      return technology;
    } else throw new BadRequestException();
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

    const tech = await this.prisma.technology.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    return tech;
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
    const { limit: take, offset: skip } = query;
    const [total, technologies] = await this.prisma.$transaction([
      this.prisma.technology.count(),
      this.prisma.technology.findMany({
        skip,
        take,
      }),
    ]);

    return {
      pagination: {
        total,
        totalPage: Math.ceil(total / take),
      },
      data: technologies,
    };
  }

  async getOne(id: string): Promise<TechnologyEntity> {
    const technology = await this.prisma.technology.findFirst({
      where: {
        id,
      },
    });

    if (!technology) throw new NotFoundException('Technology is not exist');
    return technology;
  }
}

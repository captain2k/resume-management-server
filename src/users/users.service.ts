import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { UserArgs } from './args/user.args';
import { GetUsersResponse } from './response/user.reponse';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }

  async getMany(query: UserArgs): Promise<GetUsersResponse> {
    const { limit, name, offset } = query;

    const where: Prisma.UserWhereInput = {
      OR: [
        {
          firstName: {
            contains: name,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: name,
            mode: 'insensitive',
          },
        },
      ],
    };

    const [total, users] = await this.prisma.$transaction([
      this.prisma.user.count({
        where,
      }),
      this.prisma.user.findMany({
        where,
        include: {
          profile: true,
        },
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      data: users,
      pagination: {
        limit,
        offset,
        total,
      },
    };
  }
}

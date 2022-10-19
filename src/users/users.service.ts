import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User does not exist');

    return user;
  }
}

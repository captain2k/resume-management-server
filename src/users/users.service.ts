import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/db/prisma.service';
import { UserArgs } from './args/user.args';
import { UpdateUserDto } from './dto/user.dto';
import { GetUsersResponse, UserResponse } from './response/user.response';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async getOne(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });

    if (!user) throw new NotFoundException('User does not exist');

    return new UserResponse(user);
  }

  async getMany(query: UserArgs): Promise<any> {
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

    const like = `%${name}%`;
    const result = await this.prisma
      .$queryRaw`SELECT * FROM "public"."user" WHERE "firstName" ILIKE ${like}`;

    // const [total] = await this.prisma.$transaction([
    //   this.prisma.user.`SELECT * FROM user`,
    // ]);

    // const [total, users] = await this.prisma.$transaction([
    //   this.prisma.user.count({
    //     where,
    //   }),
    //   this.prisma.user.findMany({
    //     where,
    //     include: {
    //       profile: true,
    //     },
    //     skip: offset,
    //     take: limit,
    //   }),
    // ]);
    return result;
    // return {
    //   data: users.map((user) => new UserResponse(user)),
    //   pagination: {
    //     limit,
    //     offset,
    //     total,
    //   },
    // };
  }

  async update(bearerToken: string, dto: UpdateUserDto): Promise<UserResponse> {
    const { firstName, lastName } = dto;
    const token = bearerToken.split(' ')[1];

    const { userId } = this.authService.verifyToken(token);

    const user = await this.getOne(userId);

    if (user.id !== userId) throw new ForbiddenException();

    if (firstName === user.firstName && lastName === user.lastName)
      return new UserResponse(user);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      include: {
        profile: true,
      },
      data: dto,
    });

    return new UserResponse(updatedUser);
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/db/prisma.service';
import { UserArgs } from './args/user.args';
import { ChangePasswordDto, UpdateUserDto } from './dto/user.dto';
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

  async getMany(query: UserArgs): Promise<GetUsersResponse> {
    const { limit, name, offset } = query;

    const where: Prisma.UserWhereInput = {
      OR: [
        {
          firstName: {
            contains: name ? name : '',
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: name ? name : '',
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
      data: users.map((user) => new UserResponse(user)),
      pagination: {
        limit,
        offset,
        total,
      },
    };
  }

  async update(bearerToken: string, dto: UpdateUserDto): Promise<UserResponse> {
    const { firstName, lastName } = dto;
    const token = bearerToken.split(' ')[1];

    const { userId } = this.authService.verifyToken(token);

    const user = await this.getOne(userId);

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

  async changePassword(id: string, dto: ChangePasswordDto): Promise<boolean> {
    const user = await this.getOne(id);
    const { newPassword, oldPassword } = dto;

    const hashOldPassword = this.authService.hashPassword(oldPassword);

    if (hashOldPassword !== user.password) throw new ConflictException();

    const hassNewPassword = this.authService.hashPassword(newPassword);

    await this.prisma.user.update({
      where: { id },
      data: {
        password: hassNewPassword,
      },
    });

    return true;
  }
}

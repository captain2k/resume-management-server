import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/db/prisma.service';
import { RegisterDto } from './dto/auth.dto';
import { ResgisterResponse } from './response/auth.response';
import { createHash } from 'crypto';
import { LoginDto } from './dto/auth.dto';
import { LoginResponse } from './response/auth.response';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { Token, TokenPayload } from './entities/token.entity';
import { UserResponse } from 'src/users/response/user.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(registeDto: RegisterDto): Promise<ResgisterResponse> {
    const checkEmail = await this.prisma.user.findUnique({
      where: {
        email: registeDto.email,
      },
    });

    if (checkEmail) throw new ConflictException('This email has been exist!');

    const user = await this.prisma.user.create({
      data: {
        ...registeDto,
        password: this.hashPassword(registeDto.password),
      },
    });

    return {
      user: new UserEntity(user),
      token: this.genToken(user),
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) throw new ConflictException('Your account does not exist');

    const hashPass = this.hashPassword(loginDto.password);
    if (hashPass !== user.password)
      throw new UnauthorizedException('Wrong password');

    return {
      user: new UserEntity(user),
      token: this.genToken(user),
    };
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const token: TokenPayload = this.verifyToken(refreshToken);

    const user = await this.prisma.user.findFirst({
      where: {
        id: token.userId,
      },
    });

    return {
      user: new UserEntity(user),
      token: this.genToken(user),
    };
  }

  async me(userPayload: TokenPayload): Promise<UserResponse> {
    const { userId } = userPayload;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updateAt: true,
        role: true,
      },
    });

    if (!user) throw new NotFoundException('User does not exist');

    return new UserResponse(user);
  }

  private genToken(dto: Pick<UserEntity, 'id' | 'role'>): Token {
    const { id: userId, role } = dto;

    return {
      accessToken: this.jwt.sign({ userId, role }),
      refreshToken: this.jwt.sign(
        {
          userId,
          role,
        },
        {
          expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRED'),
        },
      ),
    };
  }

  hashPassword(pass: string): string {
    const firstHash = createHash('md5').update(pass).digest('hex');
    return createHash('md5').update(firstHash).digest('hex');
  }

  verifyToken(token: string): TokenPayload {
    try {
      return this.jwt.verify(token);
    } catch {
      throw new UnauthorizedException('Refresh token is expired');
    }
  }
}

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';
import { RegisterDto } from './dto/register.dto';
import { ResgisterResponse } from './response/register.response';
import { createHash } from 'crypto';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './response/login.response';

const select = {
  id: true,
  lastName: true,
  firstName: true,
  email: true,
  password: true,
};

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
      select,
    });

    return user;
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
      select,
    });

    if (!user) throw new ConflictException('Your account does not exist');

    const hashPass = this.hashPassword(loginDto.password);
    if (hashPass !== user.password)
      throw new UnauthorizedException('Wrong password');

    return user;
  }

  hashPassword(pass: string): string {
    const firstHash = createHash('md5').update(pass).digest('hex');
    return createHash('md5').update(firstHash).digest('hex');
  }
}

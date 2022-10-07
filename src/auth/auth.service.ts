import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register() {}
}

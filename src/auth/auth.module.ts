import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/db/db.service';

@Module({
  providers: [PrismaService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/db/db.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from './jwt.config';

@Module({
  providers: [PrismaService, AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfig,
    }),
  ],
})
export class AuthModule {}

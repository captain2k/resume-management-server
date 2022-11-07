import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from './jwt.config';
import { PrismaModule } from 'src/db/prisma.module';
import { AuthGuard } from './auth.guard';
import { ThirdPartyModule } from 'src/third-party/third-party.module';

@Module({
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfig,
    }),
    ThirdPartyModule,
  ],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}

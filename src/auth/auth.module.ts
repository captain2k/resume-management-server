import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from './jwt.config';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    DbModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfig,
    }),
  ],
})
export class AuthModule {}

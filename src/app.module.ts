import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, ThirdPartyModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

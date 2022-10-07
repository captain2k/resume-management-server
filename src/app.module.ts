import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ThirdPartyModule } from './third-party/third-party.module';

@Module({
  imports: [DbModule, ThirdPartyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

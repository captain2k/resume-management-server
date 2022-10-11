import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [PrismaModule, TechnologiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

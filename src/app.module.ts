import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { ProjectsModule } from './projects/projects.module';
import { WorkingHistoriesModule } from './working-histories/working-histories.module';

@Module({
  imports: [
    PrismaModule,
    TechnologiesModule,
    ProjectsModule,
    WorkingHistoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

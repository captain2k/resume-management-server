import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TechnologiesModule } from 'src/technologies/technologies.module';
import { UsersModule } from 'src/users/users.module';
import { WorkingHistoriesController } from './working-histories.controller';
import { WorkingHistoriesService } from './working-histories.service';

@Module({
  imports: [PrismaModule, TechnologiesModule, ProjectsModule, UsersModule],
  controllers: [WorkingHistoriesController],
  providers: [WorkingHistoriesService],
})
export class WorkingHistoriesModule {}

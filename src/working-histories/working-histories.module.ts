import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { TechnologiesModule } from 'src/technologies/technologies.module';
import { WorkingHistoriesController } from './working-histories.controller';
import { WorkingHistoriesService } from './working-histories.service';

@Module({
  imports: [PrismaModule, TechnologiesModule],
  controllers: [WorkingHistoriesController],
  providers: [WorkingHistoriesService],
})
export class WorkingHistoriesModule {}

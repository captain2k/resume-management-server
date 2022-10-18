import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { WorkingHistoriesController } from './working-histories.controller';
import { WorkingHistoriesService } from './working-histories.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkingHistoriesController],
  providers: [WorkingHistoriesService],
})
export class WorkingHistoriesModule {}

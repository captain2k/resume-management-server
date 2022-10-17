import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { PrismaModule } from 'src/db/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TechnologiesService],
  controllers: [TechnologiesController],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}

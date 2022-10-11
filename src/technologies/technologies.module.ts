import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  providers: [PrismaService, TechnologiesService],
  controllers: [TechnologiesController],
})
export class TechnologiesModule {}

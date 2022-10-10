import { Module } from '@nestjs/common';
import { TechnologyService } from './technologies.service';
import { TechnologyController } from './technologies.controller';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  providers: [PrismaService, TechnologyService],
  controllers: [TechnologyController],
})
export class TechnologyModule {}

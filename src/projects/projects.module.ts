import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { TechnologiesModule } from 'src/technologies/technologies.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [PrismaModule, TechnologiesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}

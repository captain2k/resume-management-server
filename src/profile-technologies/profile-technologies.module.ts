import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { ProfileTechnologiesController } from './profile-technologies.controller';
import { ProfileTechnologiesService } from './profile-technologies.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProfileTechnologiesController],
  providers: [ProfileTechnologiesService],
})
export class ProfileTechnologiesModule {}

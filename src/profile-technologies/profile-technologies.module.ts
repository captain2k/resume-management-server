import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { TechnologiesModule } from 'src/technologies/technologies.module';
import { ProfileTechnologiesController } from './profile-technologies.controller';
import { ProfileTechnologiesService } from './profile-technologies.service';

@Module({
  imports: [PrismaModule, ProfilesModule, TechnologiesModule],
  controllers: [ProfileTechnologiesController],
  providers: [ProfileTechnologiesService],
})
export class ProfileTechnologiesModule {}

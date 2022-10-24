import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}

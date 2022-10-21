import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { ProjectsModule } from './projects/projects.module';
import { WorkingHistoriesModule } from './working-histories/working-histories.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ProfilesService } from './profiles/profiles.service';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    PrismaModule,
    TechnologiesModule,
    ProjectsModule,
    WorkingHistoriesModule,
    UsersModule,
    ProfilesModule,
  ],
  controllers: [AppController, UsersController, ProfilesController],
  providers: [AppService, UsersService, ProfilesService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from './db.service';

@Module({
  providers: [PrismaService],
})
export class DbModule {}

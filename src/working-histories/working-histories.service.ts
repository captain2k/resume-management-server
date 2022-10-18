import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { GetWorkingHistoryArgs } from './args/workingHistory.args';
import {
  CreateWorkingHistoryDto,
  UpdateWorkingHistoryDto,
} from './dto/workingHistory.dto';
import {
  GetWorkingHistoryRespose,
  WorkingHistoryResponse,
} from './response/workingHistory.response';

@Injectable()
export class WorkingHistoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: string): Promise<WorkingHistoryResponse> {
    return;
  }

  async getMany(
    query: GetWorkingHistoryArgs,
  ): Promise<GetWorkingHistoryRespose> {
    return;
  }

  async create(dto: CreateWorkingHistoryDto): Promise<WorkingHistoryResponse> {
    return;
  }

  async delete(id: string): Promise<boolean> {
    return;
  }

  async update(
    id: string,
    dto: UpdateWorkingHistoryDto,
  ): Promise<WorkingHistoryResponse> {
    return;
  }
}

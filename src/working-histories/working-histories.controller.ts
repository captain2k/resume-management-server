import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetWorkingHistoryArgs } from './args/workingHistory.args';
import {
  CreateWorkingHistoryDto,
  UpdateWorkingHistoryDto,
} from './dto/workingHistory.dto';
import {
  GetWorkingHistoryRespose,
  WorkingHistoryResponse,
} from './response/workingHistory.response';
import { WorkingHistoriesService } from './working-histories.service';

@Controller('working-histories')
@ApiTags('Working history')
export class WorkingHistoriesController {
  constructor(
    private readonly workingHistoryService: WorkingHistoriesService,
  ) {}

  @Get(':id')
  getOne(@Param('id') id: string): Promise<WorkingHistoryResponse> {
    return this.workingHistoryService.getOne(id);
  }

  @Get()
  getMany(
    @Query() query: GetWorkingHistoryArgs,
  ): Promise<GetWorkingHistoryRespose> {
    return this.workingHistoryService.getMany(query);
  }

  @Post()
  create(
    @Body() dto: CreateWorkingHistoryDto,
  ): Promise<WorkingHistoryResponse> {
    return this.workingHistoryService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.workingHistoryService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWorkingHistoryDto,
  ): Promise<WorkingHistoryResponse> {
    console.log(id);

    return this.workingHistoryService.update(id, dto);
  }
}

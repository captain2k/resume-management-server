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
import { GetWorkingHistoryArgs } from './args/working-history.args';
import {
  CreateWorkingHistoryDto,
  UpdateWorkingHistoryDto,
} from './dto/working-history.dto';
import {
  GetWorkingHistoryRespose,
  WorkingHistoryResponse,
} from './response/working-history.response';
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
    return this.workingHistoryService.update(id, dto);
  }
}

import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TechnologyService } from './technologies.service';

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  create() {
    return this.technologyService.create();
  }

  @Put(':techId')
  update() {
    return this.technologyService.update();
  }

  @Delete(':techId')
  delete() {
    return this.technologyService.delete();
  }

  @Get()
  get() {
    return this.technologyService.get();
  }

  @Get('techId')
  getDetail() {
    return this.technologyService.getDetail();
  }
}

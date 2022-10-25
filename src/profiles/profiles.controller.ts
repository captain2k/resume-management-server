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
import { ProfileArgs } from './args/profile.args';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';
import {
  GetProfilesResponse,
  ProfileResponse,
} from './response/profile.response';

@Controller('profiles')
@ApiTags('Profile')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ProfileResponse> {
    return this.service.getOne(id);
  }

  @Get()
  getMany(@Query() query: ProfileArgs): Promise<GetProfilesResponse> {
    return this.service.getMany(query);
  }

  @Post()
  create(@Body() dto: CreateProfileDto): Promise<ProfileEntity> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }

  @Post('clone/:id')
  clone(@Param('id') id: string): Promise<ProfileEntity> {
    return this.service.clone(id);
  }
}

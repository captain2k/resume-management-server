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
import { ProfilesService } from './profiles.service';
import {
  GetProfileResponse,
  ProfileResponse,
} from './response/profile.response';

@Controller('profiles')
@ApiTags('Profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ProfileResponse> {
    return this.profilesService.getOne(id);
  }

  @Get()
  getMany(@Query() query: ProfileArgs): Promise<GetProfileResponse> {
    return this.profilesService.getMany(query);
  }

  @Post()
  create(@Body() dto: CreateProfileDto) {
    return this.profilesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return this.profilesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.profilesService.delete(id);
  }

  @Post(':id')
  clone(@Param('id') id: string) {
    return this.profilesService.clone(id);
  }
}

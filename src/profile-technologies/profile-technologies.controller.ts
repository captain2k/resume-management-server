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
import { ProfileTechnologyArgs } from './args/profile-technology.args';
import {
  CreateProfileTechnologyDto,
  UpdateProfileTechnologyDto,
} from './dto/profile-technology.dto';
import { ProfileTechnologiesService } from './profile-technologies.service';
import { ProfileTechnologyResponse } from './response/profile-technology.response';

@Controller('profile-technologies')
@ApiTags('Profile technology')
export class ProfileTechnologiesController {
  constructor(private readonly service: ProfileTechnologiesService) {}

  @Post()
  create(
    @Body() dto: CreateProfileTechnologyDto,
  ): Promise<ProfileTechnologyResponse> {
    return this.service.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProfileTechnologyDto,
  ): Promise<ProfileTechnologyResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}

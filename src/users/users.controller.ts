import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserArgs } from './args/user.args';
import { ChangePasswordDto, UpdateUserDto } from './dto/user.dto';
import { GetUsersResponse, UserResponse } from './response/user.response';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getOne(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.getOne(id);
  }

  @Get()
  getMany(@Query() query: UserArgs): Promise<GetUsersResponse> {
    return this.usersService.getMany(query);
  }

  @Put()
  @UseGuards(AuthGuard)
  update(@Req() req, @Body() dto: UpdateUserDto): Promise<UserResponse> {
    return this.usersService.update(req.headers.authorization, dto);
  }

  @Put('change-pass/:id')
  changePassword(
    @Param('id') id: string,
    @Body() dto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.usersService.changePassword(id, dto);
  }
}

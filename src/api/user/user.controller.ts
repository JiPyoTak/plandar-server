import {
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { UserService } from '@/api/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post(':success')
  async createUser(@Param('success', ParseBoolPipe) success: boolean) {
    return this.userService.createUser(success);
  }

  @Post(':time/:success')
  async getUsersWithTime(
    @Param('time', ParseIntPipe) time: number,
    @Param('success', ParseBoolPipe) success: boolean,
  ) {
    return this.userService.createUserWithTime(time, success);
  }
}

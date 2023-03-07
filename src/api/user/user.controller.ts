import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserService } from '@/api/user/user.service';
import {
  CreateUserQueryDto,
  CreateUserRetDto,
} from '@/dto/user/create-user.dto';
import { User } from '@/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 500,
    description: '데이터 베이스에서 제대로 값을 읽어오지 못한 경우',
  })
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  @ApiOperation({ summary: '모든 유저정보 데이터 가져오기' })
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @ApiResponse({
    status: 500,
    description: '트랜잭션 실패한 경우',
  })
  @ApiResponse({
    status: 400,
    description: '올바른 쿼리를 넣어주지 않은 경우',
  })
  @ApiResponse({
    status: 200,
    type: CreateUserRetDto,
    isArray: true,
  })
  @Post()
  async createUser(@Query() { time, success }: CreateUserQueryDto) {
    return time
      ? this.userService.createUserWithTime(time, success)
      : this.userService.createUser(success);
  }
}

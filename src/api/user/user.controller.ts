import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserService } from '@/api/user/user.service';
import { ITokenUser, User } from '@/decorators/user.decorator';
import { User as UserEntity } from '@/entity/user.entity';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiInternalServerErrorResponse({
    description: '데이터 베이스에서 제대로 값을 읽어오지 못한 경우',
  })
  @ApiUnauthorizedResponse({
    description: 'access된 유저가 인증되지 않은 유저일 경우',
  })
  @ApiNotFoundResponse({ description: '유저 정보가 존재하지 않을경우' })
  @ApiOkResponse({ type: UserEntity })
  @ApiOperation({ summary: '유저 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@User() user: ITokenUser) {
    return this.userService.getUser(user.id);
  }
}

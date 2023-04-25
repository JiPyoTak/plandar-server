import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '@/api/user/user.service';
import { User } from '@/common/decorators';
import { GetUserSwagger } from '@/common/decorators/swagger/swagger-user.decorator';
import { TTokenUser } from '@/types';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GetUserSwagger()
  @Get()
  async getUser(@User() user: TTokenUser) {
    return this.userService.getUser(user.id);
  }
}

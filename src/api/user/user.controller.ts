import { Controller, Post } from '@nestjs/common';

import { UserService } from '@/api/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser() {
    return this.userService.createUser();
  }
}

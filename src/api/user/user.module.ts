import { Module } from '@nestjs/common';

import { UserRepository } from '@/api/user/user.repository';
import { TypeOrmExModule } from '@/common/typeOrmEx.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmExModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

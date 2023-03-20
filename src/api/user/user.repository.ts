import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import { CreateUserRetDto } from '@/dto/user/create-user.dto';
import { User } from '@/entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userInfo: CreateUserRetDto) {
    return this.save(this.create(userInfo));
  }
}

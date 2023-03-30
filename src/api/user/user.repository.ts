import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { UserCreateDto } from '@/dto/user';
import { User } from '@/entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userInfo: UserCreateDto) {
    return this.save(this.create(userInfo));
  }

  async getUserById(id: number) {
    return this.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
}

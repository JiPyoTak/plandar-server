import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/customRepository.decorator';
import { User } from '@/entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(username: string) {
    return this.save(this.create({ username }));
  }
}

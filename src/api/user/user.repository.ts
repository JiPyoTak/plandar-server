import { EntityTarget } from 'typeorm';

import { GenericTypeOrmRepository } from '@/common/generic.repository';
import { User } from '@/entity/user.entity';

export class UserRepository extends GenericTypeOrmRepository<User> {
  getName(): EntityTarget<User> {
    return User.name;
  }

  async createUser(username: string) {
    return this.getRepo().insert({
      username,
    });
  }
}

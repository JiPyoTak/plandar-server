import { EntityTarget } from 'typeorm';

import { RootRepository } from '@/common/root.repository';
import { User } from '@/entity/user.entity';

export class UserRepository extends RootRepository<User> {
  getName(): EntityTarget<User> {
    return User.name;
  }

  async createUser(username: string) {
    return this.getRepo().save(this.getRepo().create({ username }));
  }
}

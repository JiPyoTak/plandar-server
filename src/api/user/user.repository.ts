import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from '@/entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(username: string) {
    return this.save(this.create({ username }));
  }
}

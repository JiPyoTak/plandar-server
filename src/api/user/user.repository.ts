import { Repository } from 'typeorm';

import { CustomRepository } from '@/common/decorators';
import { UserCreateDto } from '@/dto/user';
import { UserEntity } from '@/entities';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
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

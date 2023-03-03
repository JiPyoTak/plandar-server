import { Inject } from '@nestjs/common';
import { EntityTarget, FindOneOptions, Repository } from 'typeorm';

import { TransactionManager } from '@/common/transaction.manager';

export abstract class RootRepository<T> {
  constructor(
    @Inject(TransactionManager) private readonly txManger: TransactionManager,
  ) {}

  abstract getName(): EntityTarget<T>;

  async save(t: T | T[]): Promise<void> {
    await this.getRepo().save(Array.isArray(t) ? t : [t]);
  }

  async findById(id: number): Promise<T | null> {
    const findOption: FindOneOptions = { where: { id } };
    return this.getRepo().findOne(findOption);
  }

  async remove(t: T | T[]): Promise<void> {
    await this.getRepo().remove(Array.isArray(t) ? t : [t]);
  }

  protected getRepo(): Repository<T> {
    return this.txManger.getEntityManager().getRepository(this.getName());
  }
}

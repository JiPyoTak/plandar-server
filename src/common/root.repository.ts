import { Inject } from '@nestjs/common';
import { EntityTarget, Repository } from 'typeorm';

import { TransactionManager } from '@/common/transaction.manager';

export abstract class RootRepository<T> extends Repository<T> {
  constructor(
    @Inject(TransactionManager) private readonly txManager: TransactionManager,
  ) {
    super(RootRepository, txManager.getEntityManager());
  }

  abstract getName(): EntityTarget<T>;

  protected getRepo(): Repository<T> {
    return this.txManager.getEntityManager().getRepository(this.getName());
  }
}

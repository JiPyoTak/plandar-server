import { Injectable, NestMiddleware } from '@nestjs/common';
import { createNamespace, getNamespace, Namespace } from 'cls-hooked';
import { NextFunction } from 'express';
import { EntityManager } from 'typeorm';

import { PLANDAR_ENTITY_MANAGER, PLANDAR_NAMESPACE } from '@/utils/constants';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  constructor(private readonly em: EntityManager) {}
  use(_req: Request, _res: Response, next: NextFunction) {
    const namespace =
      getNamespace(PLANDAR_NAMESPACE) ?? createNamespace(PLANDAR_NAMESPACE);
    return namespace.runAndReturn(async () => {
      Promise.resolve()
        .then(() => this.setEntityManager())
        .then(next);
    });
  }

  private setEntityManager() {
    const namespace = getNamespace(PLANDAR_NAMESPACE) as Namespace;
    namespace.set<EntityManager>(PLANDAR_ENTITY_MANAGER, this.em);
  }
}

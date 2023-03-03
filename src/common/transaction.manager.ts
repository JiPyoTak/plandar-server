import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import { EntityManager } from 'typeorm';

import { PLANDAR_ENTITY_MANAGER, PLANDAR_NAMESPACE } from '@/utils/constants';

@Injectable()
export class TransactionManager {
  getEntityManager(): EntityManager {
    const nameSpace =
      getNamespace(PLANDAR_NAMESPACE) ?? createNamespace(PLANDAR_NAMESPACE);
    if (!nameSpace)
      throw new InternalServerErrorException(
        `${PLANDAR_NAMESPACE} is not active`,
      );
    return nameSpace.get(PLANDAR_ENTITY_MANAGER);
  }
}

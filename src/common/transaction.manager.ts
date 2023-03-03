import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import { EntityManager } from 'typeorm';

import { PLANDAR_ENTITY_MANAGER, PLANDAR_NAMESPACE } from '@/utils/constants';

@Injectable()
export class TransactionManager {
  getEntityManager(): EntityManager {
    const nameSpace = getNamespace(PLANDAR_NAMESPACE);
    if (!nameSpace || !nameSpace.active)
      throw new InternalServerErrorException(
        `${PLANDAR_NAMESPACE} is not active`,
      );
    return nameSpace.get(PLANDAR_ENTITY_MANAGER);
  }
}

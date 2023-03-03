import { InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import { EntityManager } from 'typeorm';

import { PLANDAR_ENTITY_MANAGER, PLANDAR_NAMESPACE } from '@/utils/constants';

export function Transactional() {
  return function (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const originMethod = descriptor.value;

    async function transactionWrapped(...args: unknown[]) {
      const nameSpace = getNamespace(PLANDAR_NAMESPACE);
      if (!nameSpace || !nameSpace.active)
        throw new InternalServerErrorException(
          `${PLANDAR_NAMESPACE} is not active`,
        );

      const em = nameSpace.get(PLANDAR_ENTITY_MANAGER) as EntityManager;
      if (!em)
        throw new InternalServerErrorException(
          `Could not find EntityManager in ${PLANDAR_NAMESPACE} nameSpace`,
        );

      return await em.transaction(async (tx: EntityManager) => {
        nameSpace.set<EntityManager>(PLANDAR_ENTITY_MANAGER, tx);
        return await originMethod.apply(this, args);
      });
    }

    descriptor.value = transactionWrapped;
  };
}

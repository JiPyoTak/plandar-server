import { SetMetadata } from '@nestjs/common';

import { PLANDAR_CUSTOM_REPSOITORY } from '@/utils/constants';

export function CustomRepository<T>(
  entity: new (...args: unknown[]) => T,
): ClassDecorator {
  return SetMetadata(PLANDAR_CUSTOM_REPSOITORY, entity);
}

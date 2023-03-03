import { SetMetadata } from '@nestjs/common';

import { TYPEORM_EX_CUSTOM_REPOSITORY } from '@/utils/constants';

export function CustomRepository(entity): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}

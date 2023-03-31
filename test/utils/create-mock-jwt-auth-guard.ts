import { ExecutionContext } from '@nestjs/common';

import { UserEntity } from '@/entities';

export const createMockAuthGuard = (user: UserEntity) => ({
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = user;
    return true;
  },
});

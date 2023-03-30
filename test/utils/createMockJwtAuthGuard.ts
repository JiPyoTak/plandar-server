import { ExecutionContext } from '@nestjs/common';

import { User } from '@/entity/user.entity';

export const createMockAuthGuard = (user: User) => ({
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = user;
    return true;
  },
});

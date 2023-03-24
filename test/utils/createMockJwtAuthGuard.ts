import { ExecutionContext } from '@nestjs/common';

export const createMockJwtAuthGuard = (id: number) => ({
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = { id };
    return true;
  },
});

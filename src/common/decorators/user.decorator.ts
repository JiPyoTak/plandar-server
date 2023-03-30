import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException('유저 정보가 존재하지 않습니다.');
    }

    return request.user;
  },
);

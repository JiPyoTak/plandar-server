import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: any) {
    return true;
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      return null;
    }
    return user;
  }
}

import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('You are unauthorized');

    return;
  }
}

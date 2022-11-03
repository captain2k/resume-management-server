import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@prisma/client';
import { AzureService } from 'src/third-party/azure.service';
import { AuthService } from './auth.service';
import { TokenPayload } from './entities/token.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
    private readonly azureService: AzureService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader: string = request.headers.authorization;

    const data = await this.azureService.verify(authHeader);
    console.log(data);

    if (!authHeader) throw new UnauthorizedException('You are unauthorized');

    const match = authHeader.match(/^Bearer (?<token>.+)$/);
    if (!match || !match.groups.token) return false;

    const user: TokenPayload = this.authService.verifyToken(match.groups.token);

    if (!user) return false;

    request.user = user;

    const roles =
      this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) || [];

    if (!roles.length) return true;

    if (user.role !== Roles.ADMIN && !roles.some((r) => r === user.role))
      throw new ForbiddenException('You have no permission');

    return true;
  }
}

import {
  ForbiddenException,
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { UserRole } from 'prisma/__generated__/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();

    if (!roles) return true;

    if (!request.user || !roles.includes(request.user.role)) {
      throw new ForbiddenException('No permission');
    }

    return true;
  }
}

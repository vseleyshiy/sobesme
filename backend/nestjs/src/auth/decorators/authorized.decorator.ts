import {
  createParamDecorator,
  NotFoundException,
  type ExecutionContext,
} from '@nestjs/common';
import type { Request } from 'express';
import type { User } from 'prisma/__generated__/client';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new NotFoundException('User is not found');

    return data ? user[data] : user;
  },
);

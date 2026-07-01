import type { TypeCleanUser } from '@/libs/common/types/user.types';
import {
  createParamDecorator,
  NotFoundException,
  type ExecutionContext,
} from '@nestjs/common';
import type { Request } from 'express';

export const Authorized = createParamDecorator(
  (
    data: keyof TypeCleanUser,
    context: ExecutionContext,
  ): TypeCleanUser[keyof TypeCleanUser] | TypeCleanUser => {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new NotFoundException('Пользователь не найден.');

    return data ? user[data] : user;
  },
);

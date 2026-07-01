import type { User } from 'prisma/__generated__/client';

export type TypeCleanUser = Omit<User, 'password'>;

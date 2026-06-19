import 'express';
import 'express-session';
import type { User } from 'prisma/__generated__/browser';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

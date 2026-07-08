import 'express';
import 'express-session';
import type { IInterviewFeedback as InterviewFeedback } from './libs/common/types/interview-feedback.type';
import type { TypeCleanUser } from './libs/common/types/user.types';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: TypeCleanUser;
    }
  }
  namespace PrismaJson {
    type IInterviewFeedback = InterviewFeedback;
  }
}

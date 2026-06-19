import type { Socket } from 'socket.io';

export interface IAuthenticatedSocket extends Socket {
  data: {
    userId: string;
    interviewId: string;
  };
}

import type { Cookies } from 'cookie';

export interface ISessionCookieParsed {
  cookie: Cookies;
  userId: string;
}

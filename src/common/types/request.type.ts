import { Request } from 'express';

export type RequestAuth = Request & {
  user: {
    uid: string;
    email: string;
  };
};

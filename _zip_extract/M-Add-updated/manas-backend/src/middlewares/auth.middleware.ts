import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { ApiError } from '@/utils/ApiError';
import { securityLogger } from '@/utils/logger';

export interface AuthPayload {
  sub: string; // admin id
  role: string;
  permissions: string[];
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('Missing or malformed Authorization header'));
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AuthPayload;
    req.auth = payload;
    return next();
  } catch (err) {
    securityLogger.warn('Invalid or expired access token', { ip: req.ip, path: req.path });
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
}

import { NextFunction, Request, Response } from 'express';
import { ApiError } from '@/utils/ApiError';
import { logger } from '@/utils/logger';
import { env } from '@/config/env';

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

// Must be registered last. 4-arg signature is required for Express to treat it as an error handler.
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const message = isApiError ? err.message : 'Something went wrong';

  logger.error(message, {
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: err instanceof Error ? err.stack : undefined,
    details: isApiError ? err.details : undefined,
  });

  return res.status(statusCode).json({
    success: false,
    message: statusCode === 500 && env.isProduction ? 'Internal server error' : message,
    ...(isApiError && err.details ? { errors: err.details } : {}),
  });
}

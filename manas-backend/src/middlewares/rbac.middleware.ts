import { NextFunction, Request, Response } from 'express';
import { ApiError } from '@/utils/ApiError';
import { securityLogger } from '@/utils/logger';

// Usage: router.post('/', authenticate, requirePermission(PERMISSIONS.SERVICES_MANAGE), controller)
export function requirePermission(...permissions: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) return next(ApiError.unauthorized());

    const hasPermission = permissions.some((p) => req.auth!.permissions.includes(p));
    if (!hasPermission) {
      securityLogger.warn('Permission denied', {
        adminId: req.auth.sub,
        required: permissions,
        path: req.path,
      });
      return next(ApiError.forbidden('You do not have permission to perform this action'));
    }
    return next();
  };
}

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) return next(ApiError.unauthorized());
    if (!roles.includes(req.auth.role)) {
      return next(ApiError.forbidden('Your role does not permit this action'));
    }
    return next();
  };
}

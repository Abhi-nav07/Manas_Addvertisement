import { NextFunction, Request, Response } from 'express';

type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

// Wraps async controllers so rejected promises are forwarded to the
// centralized error handler instead of crashing the process.
export const asyncHandler = (fn: AsyncFn) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

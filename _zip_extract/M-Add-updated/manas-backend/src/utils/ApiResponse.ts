import { Response } from 'express';

interface Meta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
}

export class ApiResponse {
  static success(res: Response, data: unknown, message = 'Success', statusCode = 200, meta?: Meta) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      ...(meta ? { meta } : {}),
    });
  }

  static created(res: Response, data: unknown, message = 'Created successfully') {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response, message = 'Deleted successfully') {
    return res.status(200).json({ success: true, message, data: null });
  }
}

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '@/config/env';

const baseFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

function makeRotator(filename: string, level?: string) {
  return new DailyRotateFile({
    dirname: 'src/logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '30d',
    level,
  });
}

export const logger = winston.createLogger({
  level: 'info',
  format: baseFormat,
  transports: [
    makeRotator('app'),
    makeRotator('error', 'error'),
    ...(env.isProduction ? [] : [new winston.transports.Console({ format: winston.format.simple() })]),
  ],
});

export const auditLogger = winston.createLogger({
  level: 'info',
  format: baseFormat,
  transports: [makeRotator('audit')],
});

export const securityLogger = winston.createLogger({
  level: 'warn',
  format: baseFormat,
  transports: [makeRotator('security')],
});

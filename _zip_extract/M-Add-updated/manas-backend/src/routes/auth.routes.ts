import { Router } from 'express';
import { authController } from '@/controllers/auth.controller';
import { validate } from '@/middlewares/validate.middleware';
import { authenticate } from '@/middlewares/auth.middleware';
import { authLimiter } from '@/middlewares/rateLimiter.middleware';
import {
  loginSchema, refreshSchema, forgotPasswordSchema, resetPasswordSchema,
} from '@/validators/auth.validator';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *     responses:
 *       200: { description: Logged in }
 *       401: { description: Invalid credentials }
 */
router.post('/login', authLimiter, validate(loginSchema), authController.login);

router.post('/refresh', authLimiter, validate(refreshSchema), authController.refresh);
router.post('/logout', authenticate, authController.logout);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), authController.resetPassword);
router.get('/me', authenticate, authController.me);

export default router;

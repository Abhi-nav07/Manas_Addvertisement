import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { authRepository } from '@/repositories/auth.repository';
import { ApiError } from '@/utils/ApiError';
import { env } from '@/config/env';
import { auditLogger, securityLogger } from '@/utils/logger';
import { sendPasswordResetEmail } from '@/emails/mailer';

function signTokens(adminId: string, role: string, permissions: string[]) {
  const accessOptions: SignOptions = { expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions['expiresIn'] };
  const refreshOptions: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] };

  const accessToken = jwt.sign({ sub: adminId, role, permissions }, env.JWT_ACCESS_SECRET as Secret, accessOptions);
  const refreshToken = jwt.sign({ sub: adminId }, env.JWT_REFRESH_SECRET as Secret, refreshOptions);
  return { accessToken, refreshToken };
}

export const authService = {
  async login(email: string, password: string, ip?: string) {
    const admin = await authRepository.findByEmail(email);
    if (!admin || !admin.isActive) {
      securityLogger.warn('Login failed — unknown or inactive admin', { email, ip });
      throw ApiError.unauthorized('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      securityLogger.warn('Login failed — bad password', { email, ip });
      throw ApiError.unauthorized('Invalid email or password');
    }

    const permissions = admin.role.permissions.map((rp) => rp.permission.key);
    const { accessToken, refreshToken } = signTokens(admin.id, admin.role.name, permissions);

    const refreshHash = await bcrypt.hash(refreshToken, 10);
    await authRepository.setRefreshTokenHash(admin.id, refreshHash);
    await authRepository.setLastLogin(admin.id);

    auditLogger.info('admin.login', { adminId: admin.id, ip });

    return {
      accessToken,
      refreshToken,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role.name },
    };
  },

  async refresh(refreshToken: string) {
    let payload: { sub: string };
    try {
      payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { sub: string };
    } catch {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }

    const admin = await authRepository.findById(payload.sub);
    if (!admin?.refreshTokenHash) throw ApiError.unauthorized('Session expired, please log in again');

    const matches = await bcrypt.compare(refreshToken, admin.refreshTokenHash);
    if (!matches) throw ApiError.unauthorized('Invalid refresh token');

    const permissions = admin.role.permissions.map((rp) => rp.permission.key);
    const tokens = signTokens(admin.id, admin.role.name, permissions);

    // Rotate refresh token to limit replay window.
    const newHash = await bcrypt.hash(tokens.refreshToken, 10);
    await authRepository.setRefreshTokenHash(admin.id, newHash);

    return tokens;
  },

  async logout(adminId: string) {
    await authRepository.setRefreshTokenHash(adminId, null);
    auditLogger.info('admin.logout', { adminId });
  },

  async forgotPassword(email: string) {
    const admin = await authRepository.findByEmail(email);
    // Always return success shape to avoid leaking which emails exist.
    if (!admin) return;

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 min
    await authRepository.setResetToken(admin.id, token, expiresAt);
    await sendPasswordResetEmail(admin.email, token);
    auditLogger.info('admin.forgot_password_requested', { adminId: admin.id });
  },

  async resetPassword(token: string, newPassword: string) {
    const admin = await authRepository.findByResetToken(token);
    if (!admin) throw ApiError.badRequest('Reset token is invalid or expired');

    const hash = await bcrypt.hash(newPassword, 12);
    await authRepository.updatePassword(admin.id, hash);
    await authRepository.setRefreshTokenHash(admin.id, null); // force re-login everywhere
    auditLogger.info('admin.password_reset', { adminId: admin.id });
  },
};

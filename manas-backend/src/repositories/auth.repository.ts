import prisma from '@/database/prisma';

export const authRepository = {
  findByEmail(email: string) {
    return prisma.admin.findFirst({
      where: { email, deletedAt: null },
      include: { role: { include: { permissions: { include: { permission: true } } } } },
    });
  },

  findById(id: string) {
    return prisma.admin.findFirst({
      where: { id, deletedAt: null },
      include: { role: { include: { permissions: { include: { permission: true } } } } },
    });
  },

  setRefreshTokenHash(adminId: string, hash: string | null) {
    return prisma.admin.update({ where: { id: adminId }, data: { refreshTokenHash: hash } });
  },

  setLastLogin(adminId: string) {
    return prisma.admin.update({ where: { id: adminId }, data: { lastLoginAt: new Date() } });
  },

  setResetToken(adminId: string, token: string | null, expiresAt: Date | null) {
    return prisma.admin.update({
      where: { id: adminId },
      data: { resetToken: token, resetTokenExpiresAt: expiresAt },
    });
  },

  findByResetToken(token: string) {
    return prisma.admin.findFirst({
      where: { resetToken: token, resetTokenExpiresAt: { gt: new Date() }, deletedAt: null },
    });
  },

  updatePassword(adminId: string, passwordHash: string) {
    return prisma.admin.update({
      where: { id: adminId },
      data: { password: passwordHash, resetToken: null, resetTokenExpiresAt: null },
    });
  },
};

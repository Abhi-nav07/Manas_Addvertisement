import nodemailer from 'nodemailer';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
});

export async function sendPasswordResetEmail(to: string, token: string) {
  const resetUrl = `${env.corsOrigins[0] ?? 'http://localhost:3000'}/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: env.SMTP_FROM ?? 'no-reply@manasadvertising.com',
      to,
      subject: 'Reset your Manas Advertising admin password',
      html: `
        <p>We received a request to reset your password.</p>
        <p><a href="${resetUrl}">Click here to reset your password</a> (expires in 30 minutes).</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });
  } catch (err) {
    // Don't throw — password reset flow should not leak whether email delivery failed.
    logger.error('Failed to send password reset email', { to, err });
  }
}

export async function sendContactNotificationEmail(adminEmail: string, enquiry: { name: string; email: string; message: string }) {
  try {
    await transporter.sendMail({
      from: env.SMTP_FROM ?? 'no-reply@manasadvertising.com',
      to: adminEmail,
      subject: `New contact enquiry from ${enquiry.name}`,
      html: `<p><strong>${enquiry.name}</strong> (${enquiry.email}) wrote:</p><p>${enquiry.message}</p>`,
    });
  } catch (err) {
    logger.error('Failed to send contact notification email', { err });
  }
}

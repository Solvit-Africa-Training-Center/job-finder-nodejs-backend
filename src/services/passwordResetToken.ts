import crypto from 'crypto';
import { configs } from '../config';
import { PasswordResetTokenRepository } from '../repository/passwordResetToken';

export class PasswordResetTokenService {
  static send = async (userId: string) => {
    const token = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const data = await PasswordResetTokenRepository.fetchOne({ userId });

    console.log('success');
    if (data)
      await PasswordResetTokenRepository.update({
        userId,
        token: hashedToken,
        expiresAt,
      });
    else
      await PasswordResetTokenRepository.create({
        userId,
        token: hashedToken,
        expiresAt,
      });
    return `http://localhost:${configs.port}${configs.prefix}/auth/password-reset/${token}`;
  };

  static verify = async (token: string, userId: string) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const tokenData = await PasswordResetTokenRepository.fetchOne({
      userId,
      token: hashedToken,
    });

    if (!tokenData) throw new Error('Invalid Token');

    await PasswordResetTokenRepository.delete({ id: tokenData.id });
  };
}

import { configs } from '../config';
import { EmailVerificationTokenRepository } from '../repository';
import { createEmailVerificationToken } from '../types';
import crypto from 'crypto';

export class EmailVerificationTokenService {
  static send = async (userId: string) => {
    const token = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const data = await EmailVerificationTokenRepository.fetchOne({ userId });

    if (data)
      await EmailVerificationTokenRepository.update({
        userId,
        token: hashedToken,
        expiresAt,
      });
    else
      await EmailVerificationTokenRepository.create({
        userId,
        token: hashedToken,
        expiresAt,
      });
    return `http://localhost:${configs.port}${configs.prefix}/auth/verify-email/${token}`;
  };

  static verify = async (token: string, userId: string) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(hashedToken);
    const tokenData = await EmailVerificationTokenRepository.fetchOne({
      userId,
      token: hashedToken,
    });

    if (!tokenData) throw new Error('Invalid Token');

    await EmailVerificationTokenRepository.delete({ id: tokenData.id });
  };

  static createOtp = async (id: string) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const data: createEmailVerificationToken = {
      userId: id,
      token: otp,
      expiresAt: new Date(),
    };
    console.log(data);
    // await EmailVerificationTokenRepository.create(data);
    return otp;
  };

  static verifyOtp = async (otp: string, userId: string) => {
    const db_otp = await EmailVerificationTokenRepository.fetchOne({
      token: otp,
      userId,
    });
    if (db_otp) return true;
    return false;
  };
}

import { EmailVerificationTokenRepository } from '../repository';
import { createEmailVerificationToken } from '../types';
import { generateEmailToken } from '../utils';
import crypto from 'crypto';

export class EmailVerificationTokenService {
  static createOtp = async (id: string) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const data: createEmailVerificationToken = {
      userId: id,
      token: otp,
    };
    await EmailVerificationTokenRepository.create(data);
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

  static sendEmailVerificationToken = async (id: string) => {
    const token = generateEmailToken({ id });
    return token;
  };
}

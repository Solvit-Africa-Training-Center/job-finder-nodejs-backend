import { Request, Response } from 'express';
import { EmailVerificationTokenService } from '../services';
import { PasswordResetTokenService } from '../services/passwordResetToken';

export class AuthController {
  static sendEmailVerificationToken = async (req: Request, res: Response) => {
    const { userId } = req.body;

    const link = await EmailVerificationTokenService.send(userId);

    res.status(201).json({ link });
  };

  static verifyEmailLink = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { userId } = req.body;
    await EmailVerificationTokenService.verify(token, userId);

    res.status(200).json({ message: 'Email verified successfully' });
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { userId } = req.body;

    const link = await PasswordResetTokenService.send(userId);

    res.status(201).json({ link });
  };

  static resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { userId } = req.body;
    await PasswordResetTokenService.verify(token, userId);

    res.status(200).json({ message: 'Reset Token verified successfully' });
  };

  static createOtp = async (req: Request, res: Response) => {
    const { userId } = req.body;
    res.status(201).json({
      message: 'Token send',
      otp: await EmailVerificationTokenService.createOtp(userId),
    });
  };

  static verifyOtp = async (req: Request, res: Response) => {
    const { otp, userId } = req.body;

    const isValid = await EmailVerificationTokenService.verifyOtp(otp, userId);

    if (isValid)
      return res.status(200).json({ message: 'OTP verified successfully' });

    return res.status(400).json({ message: 'Invalid or expired OTP' });
  };
}

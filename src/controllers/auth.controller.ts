import { Request, Response } from 'express';
import { EmailVerificationTokenService } from '../services';
import { verifyToken } from '../utils';

export class AuthController {
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

  static sendVerificationEmail = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const token =
      await EmailVerificationTokenService.sendEmailVerificationToken(userId);
    res.status(200).json({ message: 'Verification email sent', token });
  };

  static verifyEmailLink = async (req: Request, res: Response) => {
    const { token } = req.params;
    const isValid = verifyToken(token);
    if (isValid) {
      res.status(200).json({ message: 'Email verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  };
}

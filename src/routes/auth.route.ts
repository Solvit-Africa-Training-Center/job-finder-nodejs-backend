import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRoute: Router = express.Router();

authRoute.post(
  '/send-email-verification',
  AuthController.sendEmailVerificationToken,
);
authRoute.post('/verify-email/:token', AuthController.verifyEmailLink);

authRoute.post('/forgot-password', AuthController.forgotPassword);
authRoute.post('/password-reset/:token', AuthController.resetPassword);

authRoute.post('/create-otp', AuthController.createOtp);
authRoute.post('/verify-otp', AuthController.verifyOtp);
export default authRoute;

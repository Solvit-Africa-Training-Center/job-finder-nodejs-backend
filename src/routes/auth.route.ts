import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRoute: Router = express.Router();

authRoute.post(
  '/send-verification-email',
  AuthController.sendVerificationEmail,
);
authRoute.get('/verify-email/:token', AuthController.verifyEmailLink);
authRoute.post('/create-otp', AuthController.createOtp);
authRoute.post('/verify-otp', AuthController.verifyOtp);
authRoute.post('/password-reset', AuthController.createOtp);
export default authRoute;

import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const LoginRouter = Router();

LoginRouter.post('/login', login);

export default LoginRouter;

import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, isAdmin } from '../middlewares';


const userRoute = express.Router();
const userController = new UserController();


userRoute.get('/', authenticate, userController.getUsers);


userRoute.patch('/:id/block', authenticate, isAdmin, userController.blockUserController);
userRoute.patch('/:id/unblock', authenticate, isAdmin, userController.unblockUserController);

export default userRoute;

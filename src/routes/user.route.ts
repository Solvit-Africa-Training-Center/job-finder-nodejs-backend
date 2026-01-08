import express, { Router } from 'express';
import { UserController } from '../controllers';
import {
  authMiddleware,
  adminOnly,
  ownerOrAdmin,
  validate,
} from '../middlewares';
import {
  createUserSchema,
  updateUserAccountSchema,
  updateProfileSchema,
  updateRoleSchema,
  paginationSchema,
} from '../utils/schemas';

const userRoute: Router = express.Router();

userRoute.post('/', validate(createUserSchema), UserController.createUser);

userRoute.get(
  '/',
  authMiddleware,
  adminOnly,
  validate(paginationSchema, 'query'),
  UserController.getUsers,
);
userRoute.get(
  '/:id/activity-log',
  authMiddleware,
  adminOnly,
  validate(paginationSchema, 'query'),
  UserController.getUserActivityLog,
);

userRoute.get('/:id', authMiddleware, ownerOrAdmin, UserController.getUser);

userRoute.patch(
  '/:id',
  authMiddleware,
  ownerOrAdmin,
  validate(updateUserAccountSchema),
  UserController.updateUserAccount,
);

userRoute.patch(
  '/:id/profile',
  authMiddleware,
  ownerOrAdmin,
  validate(updateProfileSchema),
  UserController.updateProfile,
);

userRoute.patch(
  '/:id/role',
  authMiddleware,
  adminOnly,
  validate(updateRoleSchema),
  UserController.updateRole,
);

userRoute.patch(
  '/:id/activate',
  authMiddleware,
  adminOnly,
  UserController.activate,
);

userRoute.patch(
  '/:id/deactivate',
  authMiddleware,
  adminOnly,
  UserController.deactivate,
);

userRoute.patch('/:id/block', authMiddleware, adminOnly, UserController.block);

userRoute.patch(
  '/:id/unblock',
  authMiddleware,
  adminOnly,
  UserController.unblock,
);

export default userRoute;

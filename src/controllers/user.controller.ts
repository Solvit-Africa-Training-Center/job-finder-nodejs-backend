import { Request, Response } from 'express';
import { UserService } from '../services';
import { successResponse } from '../utils';

const userService = new UserService();

export class UserController {
  // GET /users
  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.fetchAllUsers();
      return successResponse(res, {
        message: 'all Users',
        statusCode: 201,
        data: users,
      });
    } catch (error: unknown) {
      const { message, stack } = error as Error;
      return successResponse(res, {
        data: stack,
        message,
        statusCode: 500,
      });
    }
  };

  // PATCH /users/:id/block
  blockUserController = async (req: Request, res: Response) => {
    try {
      const user = await userService.blockUser(Number(req.params.id));
      return successResponse(res, {
        message: 'user is blocked',
        statusCode: 201,
        data: user,
      });
    } catch (error: unknown) {
      const { message, stack } = error as Error;
      return successResponse(res, {
        data: stack,
        message,
        statusCode: 500,
      });
    }
  };

  // PATCH /users/:id/unblock
  unblockUserController = async (req: Request, res: Response) => {
    try {
      const user = await userService.unblockUser(Number(req.params.id));
      return successResponse(res, {
        message: 'user is unblocked',
        statusCode: 201,
        data: user,
      });
    } catch (error: unknown) {
      const { message, stack } = error as Error;
      return successResponse(res, {
        data: stack,
        message,
        statusCode: 500,
      });
    }
  };

  // PATCH /users/:id/activate
  activateUserController = async (req: Request, res: Response) => {
    try {
      const user = await userService.activateUser(Number(req.params.id));
      return successResponse(res, {
        message: 'user is active',
        statusCode: 201,
        data: user,
      });
    } catch (error: unknown) {
      const { message, stack } = error as Error;
      return successResponse(res, {
        data: stack,
        message,
        statusCode: 500,
      });
    }
  };

  // PATCH /users/:id/deactivate
  deactivateUserController = async (req: Request, res: Response) => {
    try {
      const user = await userService.deactivateUser(Number(req.params.id));
      return successResponse(res, {
        message: 'user is active',
        statusCode: 201,
        data: user,
      });
    } catch (error: unknown) {
      const { message, stack } = error as Error;
      return successResponse(res, {
        data: stack,
        message,
        statusCode: 500,
      });
    }
  };
}

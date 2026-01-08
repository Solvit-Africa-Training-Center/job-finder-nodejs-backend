import { Request, Response } from 'express';
import { UserService, AuditService } from '../services';
import {
  asyncHandler,
  successResponse,
  AppError,
  getPagination,
} from '../utils';

const userService = new UserService();
const auditService = new AuditService();
const requireAuthUserId = (req: Request): number => {
  const id = req.userId;
  if (id == null) throw new AppError('Unauthorized', 401);
  return id;
};

export class UserController {
  static createUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;

    const user = await userService.createUser(
      email,
      password,
      firstName,
      lastName,
    );

    successResponse(res, {
      statusCode: 201,
      message: 'User created successfully',
      data: user,
    });
  });

  static getUsers = asyncHandler(async (req: Request, res: Response) => {
    const { limit, offset } = getPagination(req.query);

    const result = await userService.getAllUsers(limit, offset);

    successResponse(res, {
      statusCode: 200,
      message: 'Users retrieved successfully',
      data: result,
    });
  });

  static getUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUser(Number(req.params.id));

    successResponse(res, {
      statusCode: 200,
      message: 'User retrieved successfully',
      data: user,
    });
  });

  static updateUserAccount = asyncHandler(
    async (req: Request, res: Response) => {
      const userId = Number(req.params.id);
      const { email, isActive } = req.body;

      if (isActive !== undefined && !req.isAdmin) {
        throw new AppError(
          'Forbidden: Only admins can change user active status',
          403,
        );
      }

      const user = await userService.updateUserAccount(userId, {
        email,
        isActive,
      });

      successResponse(res, {
        statusCode: 200,
        message: 'User account updated successfully',
        data: user,
      });
    },
  );

  static updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const { firstName, lastName, username, profilePicture } = req.body;

    if (req.userId !== userId && !req.isAdmin) {
      throw new AppError(
        'Forbidden: You can only update your own profile',
        403,
      );
    }

    const user = await userService.updateProfile(userId, {
      firstName,
      lastName,
      username,
      profilePicture,
    });

    successResponse(res, {
      statusCode: 200,
      message: 'Profile updated successfully',
      data: user,
    });
  });

  static updateRole = asyncHandler(async (req: Request, res: Response) => {
    if (!req.isAdmin) {
      throw new AppError('Forbidden: Only admins can change user roles', 403);
    }

    const { role } = req.body;

    const userId = Number(req.params.id);
    const adminId = requireAuthUserId(req);

    const user = await userService.updateRole(userId, role);

    await auditService.logAction({
      userId,
      adminId,
      action: 'role_change',
      details: { newRole: role },
    });

    successResponse(res, {
      statusCode: 200,
      message: 'User role updated successfully',
      data: user,
    });
  });

  static activate = asyncHandler(async (req: Request, res: Response) => {
    if (!req.isAdmin) {
      throw new AppError('Forbidden: Only admins can activate users', 403);
    }

    const userId = Number(req.params.id);
    const adminId = requireAuthUserId(req);

    const user = await userService.activateUser(userId);

    await auditService.logAction({
      userId,
      adminId,
      action: 'activate',
      details: { isActive: true },
    });

    successResponse(res, {
      statusCode: 200,
      message: 'User activated successfully',
      data: user,
    });
  });

  static deactivate = asyncHandler(async (req: Request, res: Response) => {
    if (!req.isAdmin) {
      throw new AppError('Forbidden: Only admins can deactivate users', 403);
    }

    const userId = Number(req.params.id);
    const adminId = requireAuthUserId(req);

    const user = await userService.deactivateUser(userId);

    await auditService.logAction({
      userId,
      adminId,
      action: 'deactivate',
      details: { isActive: false },
    });

    successResponse(res, {
      statusCode: 200,
      message: 'User deactivated successfully',
      data: user,
    });
  });

  static block = asyncHandler(async (req: Request, res: Response) => {
    if (!req.isAdmin) {
      throw new AppError('Forbidden: Only admins can block users', 403);
    }

    const userId = Number(req.params.id);
    const adminId = requireAuthUserId(req);

    const user = await userService.blockUser(userId);

    await auditService.logAction({
      userId,
      adminId,
      action: 'block',
      details: { isBlocked: true },
    });

    successResponse(res, {
      statusCode: 200,
      message: 'User blocked successfully',
      data: user,
    });
  });

  static unblock = asyncHandler(async (req: Request, res: Response) => {
    if (!req.isAdmin) {
      throw new AppError('Forbidden: Only admins can unblock users', 403);
    }

    const userId = Number(req.params.id);
    const adminId = requireAuthUserId(req);

    const user = await userService.unblockUser(userId);

    await auditService.logAction({
      userId,
      adminId,
      action: 'unblock',
      details: { isBlocked: false },
    });

    successResponse(res, {
      statusCode: 200,
      message: 'User unblocked successfully',
      data: user,
    });
  });

  static getUserActivityLog = asyncHandler(
    async (req: Request, res: Response) => {
      const { limit, offset } = getPagination(req.query);

      const result = await auditService.getUserActivityLog(
        Number(req.params.id),
        limit,
        offset,
      );

      successResponse(res, {
        statusCode: 200,
        message: 'Activity log retrieved successfully',
        data: result,
      });
    },
  );
}

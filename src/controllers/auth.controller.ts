import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse } from '../utils/apiResponse';

const authService = new AuthService();

export class AuthController {
    register = asyncHandler(async (req: Request, res: Response) => {
        const user = await authService.register(req.body);

        return successResponse(res, {
            statusCode: 201,
            message: 'User registered successfully',
            data: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const { user, token } = await authService.login(req.body);

        return successResponse(res, {
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                },
                token,
            },
        });
    });
}

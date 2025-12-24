import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: string;
    };
}


export const mockAuthMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    req.user = {
        id: 1,
        role: 'admin',
    };

    next();
};
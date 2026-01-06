import { Request, Response } from 'express';
import { loginUser } from '../services';
import { successResponse } from '../utils';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return successResponse(res, {
        message: "User doesn't exist",
        statusCode: 404,
      });
    }

    const user = await loginUser(email, password);

    return successResponse(res, {
      message: 'Login Successfully',
      statusCode: 200,
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

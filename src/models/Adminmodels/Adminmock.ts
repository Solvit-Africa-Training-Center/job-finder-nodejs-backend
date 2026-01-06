import { Request, Response, NextFunction } from "express";

export const mockAdmin = (req: Request, _res: Response, next: NextFunction) => {
  req.admin = {
    id: "mock-admin-id",
    email: "admin@mock.com",
    role: "SUPER_ADMIN",
  };
  next();
};

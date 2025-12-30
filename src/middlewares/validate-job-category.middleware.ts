import { Request, Response, NextFunction } from "express";

export const validateCreateJobCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      error: "Job category name must be a non-empty string",
    });
  }

  next();
};

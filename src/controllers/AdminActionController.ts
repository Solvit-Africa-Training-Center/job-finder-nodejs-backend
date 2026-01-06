import { Request, Response } from "express";
import AdminActionLog from "../models/Adminmodels/AdminActionLog";

export const getAuditLogs = async (_req: Request, res: Response) => {
  const logs = await AdminActionLog.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(logs);
};

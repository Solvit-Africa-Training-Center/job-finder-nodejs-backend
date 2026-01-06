import { Request, Response } from "express";
import StaticContent from "../models/FAQs/StaticContent";
import { logAdminAction } from "../services/AdminLogService";

export const createContent = async (req: Request, res: Response) => {
  const content = await StaticContent.create(req.body);

  await logAdminAction({
    adminId: req.admin!.id,
    action: "CREATE",
    entity: "STATIC_CONTENT",
    entityId: content.id,
  });

  res.status(201).json(content);
};

export const getContents = async (_req: Request, res: Response) => {
  res.json(await StaticContent.findAll());
};

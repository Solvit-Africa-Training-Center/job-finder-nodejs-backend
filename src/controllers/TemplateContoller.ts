import { Request, Response } from "express";
import EmailTemplate from "../models/FAQs/EmailTemplates";
import CVTemplate from "../models/FAQs/CVtemplates";
import { logAdminAction } from "../services/AdminLogService";

export const createEmailTemplate = async (req: Request, res: Response) => {
  const template = await EmailTemplate.create(req.body);

  await logAdminAction({
    adminId: req.admin!.id,
    action: "CREATE",
    entity: "EMAIL_TEMPLATE",
    entityId: template.id,
  });

  res.status(201).json(template);
};

export const createCVTemplate = async (req: Request, res: Response) => {
  const template = await CVTemplate.create(req.body);

  await logAdminAction({
    adminId: req.admin!.id,
    action: "CREATE",
    entity: "CV_TEMPLATE",
    entityId: template.id,
  });

  res.status(201).json(template);
};
export const getEmailTemplates = async (_req: Request, res: Response) => {
  const templates = await EmailTemplate.findAll();
  res.json(templates);
};

export const getCVTemplates = async (_req: Request, res: Response) => {
  const templates = await CVTemplate.findAll();
  res.json(templates);
};
export const updateEmailTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
    await EmailTemplate.update(req.body, { where: { id } });
    await logAdminAction({
    adminId: req.admin!.id,
    action: "UPDATE",
    entity: "EMAIL_TEMPLATE",
    entityId: id,
    });
    res.json({ message: "Updated successfully" });
};
export const updateCVTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
    await CVTemplate.update(req.body, { where: { id } });   
    await logAdminAction({
    adminId: req.admin!.id,
    action: "UPDATE",
    entity: "CV_TEMPLATE",
    entityId: id,
    });
    res.json({ message: "Updated successfully" });
};

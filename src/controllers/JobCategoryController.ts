import { Request, Response } from "express";
import JobCategory from "../models/Jobs/JobCategory";
import { logAdminAction } from "../services/AdminLogService";

export const createCategory = async (req: Request, res: Response) => {
  const { name, slug } = req.body;

  const category = await JobCategory.create({ name, slug });

  await logAdminAction({
    adminId: req.admin!.id,
    action: "CREATE",
    entity: "JOB_CATEGORY",
    entityId: category.id.toString(),
    
  });

  res.status(201).json(category);
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await JobCategory.findAll();
  res.json(categories);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  await JobCategory.update(req.body, { where: { id } });

  await logAdminAction({
    adminId: req.admin!.id,
    action: "UPDATE",
    entity: "JOB_CATEGORY",
    entityId: id,
  });

  res.json({ message: "Updated successfully" });
};

import { Request, Response } from "express";
import { JobCategoryService } from "../services";

const service = new JobCategoryService();

export class JobCategoryController {
  
  create = async (req: Request, res: Response) => {
    try {
      const { name, description, parent_id, industry } = req.body;

      if (!name || !industry) {
        return res.status(400).json({
          message: "Name and industry are required",
        });
      }

      const category = await service.create({
        name,
        industry,
        description,
        parent_id, 
      });

      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  
  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await service.fetchAll();
      res.status(200).json({message:"categories are:",data:categories});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  
  getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 

      const category = await service.fetchById(id);
      res.status(200).json(category);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

 
  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const category = await service.update(id, req.body);
      res.status(200).json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await service.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };
}

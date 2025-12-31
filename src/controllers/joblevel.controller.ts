import { Request, Response } from "express";
import { JobLevelService } from "../services";

const service = new JobLevelService();

export class JobLevelController {
  // CREATE
  create = async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const jobLevel = await service.create({ name, description });
      res.status(201).json(jobLevel);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // READ ALL
  getAll = async (_req: Request, res: Response) => {
    try {
      const jobLevels = await service.fetchAll();
      res.status(200).json(jobLevels);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // READ ONE
  getOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id; // UUID string

      const jobLevel = await service.fetchById(id);
      res.status(200).json(jobLevel);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  // UPDATE
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id; // UUID string

      const jobLevel = await service.update(id, req.body);
      res.status(200).json(jobLevel);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // DELETE
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id; // UUID string

      await service.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };
}

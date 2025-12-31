import { Request, Response } from "express";
import { JobTitleService } from "../services";

const service = new JobTitleService();

export class JobTitleController {
  // CREATE
  create = async (req: Request, res: Response) => {
    try {
      const {
        name,
        description,
        jobCategoryId,
        jobLevelId,
      } = req.body;

      const jobTitle = await service.create({
        name,
        description,
        jobCategoryId, // UUID string
        jobLevelId,    // UUID string
      });

      res.status(201).json(jobTitle);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  // READ ALL
  getAll = async (_req: Request, res: Response) => {
    try {
      const jobTitles = await service.fetchAll();
      res.status(200).json(jobTitles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // READ ONE
  getOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id; // UUID string

      const jobTitle = await service.fetchById(id);
      res.status(200).json(jobTitle);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  // UPDATE
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id; // UUID string

      const jobTitle = await service.update(id, {
        name: req.body.name,
        description: req.body.description,
        jobCategoryId: req.body.jobCategoryId,
        jobLevelId: req.body.jobLevelId,
      });

      res.status(200).json(jobTitle);
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

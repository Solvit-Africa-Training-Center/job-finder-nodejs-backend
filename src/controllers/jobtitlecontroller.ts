import { Request, Response } from "express";
import { JobTitleService } from "../services";

export class JobTitleController {

  create = async (req: Request, res: Response) => {
    try {
      const models = req.app.get("models");
      const service = new JobTitleService(models);

      const jobTitle = await service.create(req.body);
      res.status(201).json(jobTitle);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const models = req.app.get("models");
      const service = new JobTitleService(models);

      const jobTitles = await service.fetchAll();
      res.status(200).json(jobTitles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const models = req.app.get("models");
      const service = new JobTitleService(models);

      const jobTitle = await service.fetchById(Number(req.params.id));
      res.status(200).json(jobTitle);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const models = req.app.get("models");
      const service = new JobTitleService(models);

      const jobTitle = await service.update(
        Number(req.params.id),
        req.body
      );

      res.status(200).json(jobTitle);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const models = req.app.get("models");
      const service = new JobTitleService(models);

      await service.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };
}

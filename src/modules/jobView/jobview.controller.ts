import { Request, Response } from "express";

export const JobViewController = {
  create: (req: Request, res: Response) => {
    // TODO: Implement job view creation logic
    res.status(201).json({ message: "Job view created" });
  },
  getByJob: (req: Request, res: Response) => {
    // TODO: Implement fetching job views by job ID
    res.status(200).json({ message: "Job views retrieved" });
  },
  count: (req: Request, res: Response) => {
    // TODO: Implement counting job views
    res.status(200).json({ count: 0 });
  },
};

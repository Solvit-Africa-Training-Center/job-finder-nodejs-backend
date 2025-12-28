import { Request, Response } from 'express';
import { AdminService } from '../services/AdminService';

export class AdminController {
  static async create(req: Request, res: Response) {
    const admin = await AdminService.createAdmin(req.body);
    return res.status(201).json(admin);
  }

  static async list(req: Request, res: Response) {
    const admins = await AdminService.getAdmins();
    return res.json(admins);
  }

  static async getOne(req: Request, res: Response) {
    const admin = await AdminService.getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.json(admin);
  }

  static async deactivate(req: Request, res: Response) {
    await AdminService.deactivateAdmin(req.params.id);
    return res.status(204).send();
  }
}

import { Request, Response } from 'express';
import { UserRepository } from '../repository';

export class AdminController {
  static approveRecruiter = async (req: Request, res: Response) => {
    const { userId } = req.params;

    await UserRepository.update({
      id: userId,
      isApproved: true,
    } as any);

    return res.status(200).json({ message: 'Recruiter approved' });
  };
}

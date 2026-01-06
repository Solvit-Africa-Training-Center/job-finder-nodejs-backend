import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';

const router = Router();

router.patch('/approve/:userId', AdminController.approveRecruiter);

export default router;

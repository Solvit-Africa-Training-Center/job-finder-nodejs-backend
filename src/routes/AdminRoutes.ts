import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';

const router = Router();

router.post('/', AdminController.create);
router.get('/', AdminController.list);
router.get('/:id', AdminController.getOne);
router.patch('/:id/deactivate', AdminController.deactivate);

export default router;

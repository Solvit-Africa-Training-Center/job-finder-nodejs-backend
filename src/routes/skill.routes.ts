import express, { Router } from 'express';
import { SkillController } from '../controllers';

const skillRouter: Router = express.Router();
const skillController = new SkillController();

skillRouter.post('/', skillController.create);
skillRouter.get('/', skillController.getAll);
skillRouter.get('/search', skillController.search);
skillRouter.get('/single', skillController.getById);
skillRouter.patch('/', skillController.update);
skillRouter.delete('/', skillController.delete);

export default skillRouter;

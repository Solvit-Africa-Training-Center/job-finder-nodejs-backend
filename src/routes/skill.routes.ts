import express, { Router } from 'express';
import { SkillController } from '../controllers';

const skillRoute: Router = express.Router();
const skillController = new SkillController();

skillRoute.post('/', skillController.createSkill);
skillRoute.get('/', skillController.getAllSkills);
skillRoute.get('/:id', skillController.getSkillById);
skillRoute.patch('/:id', skillController.updateSkill);
skillRoute.delete('/:id', skillController.deleteSkill);
skillRoute.get('/category/:category', skillController.getSkillsByCategory);

export default skillRoute;

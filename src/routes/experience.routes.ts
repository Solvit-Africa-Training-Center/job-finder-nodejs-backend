import express, { Router } from 'express';
import { ExperienceController } from '../controllers';

const experienceRouter: Router = express.Router();
const experienceController = new ExperienceController();

experienceRouter.post('/', experienceController.create);
experienceRouter.get('/', experienceController.getCandidateExperience);
experienceRouter.get('/single', experienceController.getById);
experienceRouter.patch('/', experienceController.update);
experienceRouter.delete('/', experienceController.delete);

export default experienceRouter;

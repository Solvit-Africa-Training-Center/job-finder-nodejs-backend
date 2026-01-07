import express, { Router } from 'express';
import { EducationController } from '../controllers';

const educationRouter: Router = express.Router();
const educationController = new EducationController();

educationRouter.post('/', educationController.create);
educationRouter.get('/', educationController.getCandidateEducation);
educationRouter.get('/single', educationController.getById);
educationRouter.patch('/', educationController.update);
educationRouter.delete('/', educationController.delete);

export default educationRouter;

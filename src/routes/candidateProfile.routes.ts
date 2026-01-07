import express, { Router } from 'express';
import { CandidateProfileController } from '../controllers';

const candidateProfileRouter: Router = express.Router();
const candidateProfileController = new CandidateProfileController();

candidateProfileRouter.post('/', candidateProfileController.create);
candidateProfileRouter.get('/', candidateProfileController.getAll);
candidateProfileRouter.get('/single', candidateProfileController.getById);
candidateProfileRouter.get('/user', candidateProfileController.getByUserId);
candidateProfileRouter.get(
  '/completion',
  candidateProfileController.getProfileCompletion,
);
candidateProfileRouter.patch('/', candidateProfileController.update);
candidateProfileRouter.delete('/', candidateProfileController.delete);

export default candidateProfileRouter;

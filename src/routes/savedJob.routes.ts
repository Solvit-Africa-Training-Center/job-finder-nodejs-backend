import express, { Router } from 'express';
import { SavedJobController } from '../controllers';

const savedJobRouter: Router = express.Router();
const savedJobController = new SavedJobController();

savedJobRouter.post('/', savedJobController.saveJob);
savedJobRouter.get('/', savedJobController.getSavedJobs);
savedJobRouter.get('/check', savedJobController.checkIfSaved);
savedJobRouter.delete('/', savedJobController.unsaveJob);

export default savedJobRouter;

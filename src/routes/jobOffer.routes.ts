import express, { Router } from 'express';
import { JobOfferController } from '../controllers';

const jobOfferRouter: Router = express.Router();
const jobOfferController = new JobOfferController();

jobOfferRouter.post('/', jobOfferController.create);
jobOfferRouter.get('/', jobOfferController.getCandidateOffers);
jobOfferRouter.get('/history', jobOfferController.getOfferHistory);
jobOfferRouter.get('/single', jobOfferController.getById);
jobOfferRouter.patch('/status', jobOfferController.updateStatus);
jobOfferRouter.patch('/', jobOfferController.update);
jobOfferRouter.delete('/', jobOfferController.delete);

export default jobOfferRouter;

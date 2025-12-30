import { Router } from 'express';
import JobController from '../controllers/job.controller';

const router = Router();

router.post('/jobs', JobController.createJob);
router.get('/jobs', JobController.getAllJobs);
router.get('/jobs/:id', JobController.getJobById);
router.put('/jobs/:id', JobController.updateJob);
router.delete('/jobs/:id', JobController.deleteJob);

export default router;

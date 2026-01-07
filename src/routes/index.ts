import express, { Router } from 'express';
import faqRouter from './faq.routes';
import staticPageRouter from './staticPage.routes';
import candidateProfileRouter from './candidateProfile.routes';
import skillRouter from './skill.routes';
import candidateSkillRouter from './candidateSkill.routes';
import educationRouter from './education.routes';
import experienceRouter from './experience.routes';
import savedJobRouter from './savedJob.routes';
import jobOfferRouter from './jobOffer.routes';

const mainRoute: Router = express.Router();

mainRoute.use('/faqs', faqRouter);
mainRoute.use('/pages', staticPageRouter);
mainRoute.use('/candidate-profiles', candidateProfileRouter);
mainRoute.use('/skills', skillRouter);
mainRoute.use('/candidate-skills', candidateSkillRouter);
mainRoute.use('/education', educationRouter);
mainRoute.use('/experience', experienceRouter);
mainRoute.use('/saved-jobs', savedJobRouter);
mainRoute.use('/job-offers', jobOfferRouter);

export default mainRoute;

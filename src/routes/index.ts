import express, { Router } from 'express';
import faqRouter from './faq.routes';
import staticPageRouter from './staticPage.routes';
import candidateRouter from './candidate.routes';
import skillRouter from './skill.routes';

const mainRoute: Router = express.Router();

mainRoute.use('/faqs', faqRouter);
mainRoute.use('/pages', staticPageRouter);
mainRoute.use('/candidates', candidateRouter);
mainRoute.use('/skills', skillRouter);

export default mainRoute;

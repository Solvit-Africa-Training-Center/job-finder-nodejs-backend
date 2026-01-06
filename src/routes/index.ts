import express, { Router } from 'express';
import faqRouter from './faq.routes';
import staticPageRouter from './staticPage.routes';
import authRoute from './auth.route';

const mainRoute: Router = express.Router();

mainRoute.use('/faqs', faqRouter);
mainRoute.use('/pages', staticPageRouter);
mainRoute.use('/auth', authRoute);

export default mainRoute;

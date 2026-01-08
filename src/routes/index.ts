import express, { Router } from 'express';
import faqRouter from './faq.routes';
import staticPageRouter from './staticPage.routes';
import userRoute from './user.route';

const mainRoute: Router = express.Router();

mainRoute.use('/faqs', faqRouter);
mainRoute.use('/pages', staticPageRouter);
mainRoute.use('/users', userRoute);

export default mainRoute;

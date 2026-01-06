import express, { Router } from 'express';
import faqRouter from './faq.routes';
import staticPageRouter from './staticPage.routes';
import notificationRouter from './notification.routes';
import authRouter from './auth.routes';

const mainRoute: Router = express.Router();

mainRoute.use('/faqs', faqRouter);
mainRoute.use('/pages', staticPageRouter);
mainRoute.use('/notifications', notificationRouter);
mainRoute.use('/auth', authRouter);

export default mainRoute;


import express, { Router } from 'express';
import userRoute from './user.route';
import LoginRouter from './auth.route';
import faqRouter from './faq.routes';
import staticPageRouter from './staticPage.routes';

const mainRoute: Router = express.Router();

mainRoute.use('/user', userRoute);
mainRoute.use('/auth', LoginRouter)
mainRoute.use('/faqs', faqRouter);
mainRoute.use('/pages', staticPageRouter);

export default mainRoute;

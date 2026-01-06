import express, { Router } from 'express';
import faqRouter from './faq.routes';
import staticPageRouter from './staticPage.routes';
import blogRouter from './blog.routes';

const mainRoute: Router = express.Router();

mainRoute.use('/faqs', faqRouter);
mainRoute.use('/pages', staticPageRouter);
mainRoute.use('/blogs', blogRouter);

export default mainRoute;

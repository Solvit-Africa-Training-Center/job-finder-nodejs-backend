import express, { Router } from 'express';
import faqRouter from './faq.routes';
import staticPageRouter from './staticPage.routes';
import conversationRoutes from './conversation.routes';
import messageRoutes from './message.routes';

const mainRoute: Router = express.Router();

mainRoute.use('/faqs', faqRouter);
mainRoute.use('/pages', staticPageRouter);
mainRoute.use('/conversations', conversationRoutes);
mainRoute.use('/messages', messageRoutes);


export default mainRoute;


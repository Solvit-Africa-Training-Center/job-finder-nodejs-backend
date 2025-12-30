import express, { Router } from 'express';
import { FAQController } from '../controllers';

const faqRouter: Router = express.Router();
const faqController = new FAQController();

faqRouter.get('/', faqController.getAll);
faqRouter.get('/:id', faqController.getById);
faqRouter.get('/category/:category', faqController.getByCategory);
faqRouter.post('/', faqController.create);
faqRouter.patch('/:id', faqController.update);
faqRouter.delete('/:id', faqController.delete);
faqRouter.post('/reorder', faqController.reorder);

export default faqRouter;

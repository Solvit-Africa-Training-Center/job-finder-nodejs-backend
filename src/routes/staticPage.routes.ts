import express, { Router } from 'express';
import { StaticPageController } from '../controllers';

const staticPageRouter: Router = express.Router();
const staticPageController = new StaticPageController();

staticPageRouter.get('/', staticPageController.getAll);
staticPageRouter.get('/:id', staticPageController.getById);
staticPageRouter.get('/slug/:slug', staticPageController.getBySlug);
staticPageRouter.post('/', staticPageController.create);
staticPageRouter.patch('/:id', staticPageController.update);
staticPageRouter.delete('/:id', staticPageController.delete);

export default staticPageRouter;

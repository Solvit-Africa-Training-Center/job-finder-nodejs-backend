import express, { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';

const router: Router = express.Router();
const notificationController = new NotificationController();

/**
 * @swagger
 * /notifications/list:
 *   get:
 *     summary: Get all notifications (For Testing/Admin)
 *     tags: [Notifications]
 * /notifications/test:
 *   post:
 *     summary: Trigger a test notification
 *     tags: [Notifications]
 */
router.get('/list', notificationController.getAll);
router.post('/test', notificationController.send);
router.get('/test', notificationController.send);

export default router;

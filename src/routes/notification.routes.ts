import express, { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';

const router: Router = express.Router();
const notificationController = new NotificationController();

/**
 * @swagger
 * /notifications/test:
 *   post:
 *     summary: Trigger a test notification/email
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               type:
 *                 type: string
 *                 enum: [new_message, application_status, job_alert, job_status, welcome, verification]
 *               metadata:
 *                 type: object
 */
/**
 * @swagger
 * /notifications/direct-test:
 *   post:
 *     summary: Trigger a direct test email (skips queue/Redis)
 *     tags: [Notifications]
 */
router.post('/direct-test', notificationController.directTest);

router.post('/test', notificationController.testNotification);

export default router;

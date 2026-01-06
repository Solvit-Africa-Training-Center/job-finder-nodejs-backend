import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse } from '../utils/apiResponse';
import { EmailService } from '../services/email.service';
import { getLoginUrl, getJobUrl, getApplicationUrl, getMessageUrl, getVerificationUrl, getDashboardUrl } from '../config/urls';

const notificationService = new NotificationService();

export class NotificationController {
    /**
     * Get all notifications
     */
    getAll = asyncHandler(async (req: Request, res: Response) => {
        const notifications = await notificationService.getAllNotifications();
        return successResponse(res, {
            data: notifications,
        });
    });

    /**
     * Send/Create a notification
     */
    send = asyncHandler(async (req: Request, res: Response) => {
        // Merge body and query to support both POST (JSON) and GET (Browser/Query Params) testing
        const data = { ...req.body, ...req.query };
        const { userId, email, from, ...content } = data;

        // Use userId if provided, otherwise email, as the 'to' parameter
        const to = userId || email || content.userId;
        const sender = from || content.senderName || 'System';

        await notificationService.notify(to, sender, content);

        // "Let anyone who sends data to our database get all notifications"
        const allNotifications = await notificationService.getAllNotifications();

        return successResponse(res, {
            statusCode: 201,
            message: 'Notification processed successfully. Returning all notifications.',
            data: allNotifications,
        });
    });
}

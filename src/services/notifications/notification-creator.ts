import { Notification } from '../../database/models/notification.model';
import { NotificationPreference } from '../../database/models/notificationPreference.model';
import { emailQueue } from '../queue.service';

export interface CreateNotificationData {
    userId: number;
    title: string;
    message: string;
    type: string;
    metadata?: any;
}

/**
 * Create an in-app notification and schedule email if needed
 */
export async function createNotification(data: CreateNotificationData) {
    // 1. Create in-app notification
    const notification = await Notification.create({
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        isRead: false,
    });

    // 2. Check preferences
    const prefs = await NotificationPreference.findOne({
        where: { userId: data.userId },
    });

    if (prefs && prefs.emailEnabled) {
        if (prefs.dailyDigest) {
            console.log(`Notification for user ${data.userId} added to daily digest queue`);
            return notification;
        }

        // 3. Schedule email with 5-minute delay
        await emailQueue.add(
            'check-and-send-email',
            {
                notificationId: notification.id,
                userId: data.userId,
                type: data.type,
                data: data.metadata,
            },
            {
                delay: 5 * 60 * 1000, // 5 minutes
                attempts: 3,
            }
        );
    }

    return notification;
}

/**
 * Get all notifications ordered by creation date
 */
export async function getAllNotifications() {
    return await Notification.findAll({
        order: [['createdAt', 'DESC']],
    });
}

/**
 * Get or create user notification preferences
 */
export async function getOrCreatePreferences(userId: number) {
    let prefs = await NotificationPreference.findOne({ where: { userId } });

    if (!prefs) {
        prefs = await NotificationPreference.create({
            userId,
            emailEnabled: true,
            pushEnabled: true,
            smsEnabled: false,
            dailyDigest: false,
        });
    }

    return prefs;
}

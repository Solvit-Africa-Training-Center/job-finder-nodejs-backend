import { Notification } from '../../database/models/notification.model';
import { NotificationPreference } from '../../database/models/notificationPreference.model';
import { SampleUser } from '../../database/models/sampleuser';
import { QueueService } from '../queue.service';
import { Op } from 'sequelize';
import { getEmailConfig } from './notification-email';

/**
 * Process the delayed email check
 * Checks if notification is still unread before sending email
 */
export async function processEmailCheck(jobData: any) {
    const { notificationId, userId, type, data } = jobData;

    const notification = await Notification.findByPk(notificationId);
    if (!notification || notification.isRead) {
        console.log(`Notification ${notificationId} already read or not found. Skipping email.`);
        return;
    }

    // Still unread, send the email
    const user = await SampleUser.findByPk(userId);
    if (!user) return;

    const { subject, templateName } = getEmailConfig(type, data);

    await QueueService.addEmailJob({
        type,
        to: (user as any).email,
        subject,
        templateName,
        data: { ...data, name: (user as any).email.split('@')[0] },
    });
}

/**
 * Send daily digests to all users who have it enabled
 */
export async function sendDailyDigests() {
    const prefs = await NotificationPreference.findAll({
        where: { dailyDigest: true, emailEnabled: true },
    });

    for (const pref of prefs) {
        const unreadNotifications = await Notification.findAll({
            where: {
                userId: pref.userId,
                isRead: false,
                createdAt: {
                    [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
            },
        });

        if (unreadNotifications.length > 0) {
            const user = await SampleUser.findByPk(pref.userId);
            if (user) {
                await QueueService.addEmailJob({
                    type: 'daily_digest',
                    to: (user as any).email,
                    subject: 'Your Daily Job Finder Summary',
                    templateName: 'daily-digest',
                    data: {
                        name: (user as any).email.split('@')[0],
                        notifications: unreadNotifications,
                        dashboardUrl: 'http://localhost:3000/dashboard',
                    },
                });
            }
        }
    }
}

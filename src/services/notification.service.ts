import { Notification } from '../database/models/notification.model';
import { NotificationPreference } from '../database/models/notificationPreference.model';
import { QueueService, emailQueue } from './queue.service';
import { SampleUser } from '../database/models/sampleuser'; // Using SampleUser as placeholder for User
import { Op } from 'sequelize';

export class NotificationService {
    /**
     * Create a notification and schedule email if needed
     */
    async createNotification(data: {
        userId: number;
        title: string;
        message: string;
        type: string;
        metadata?: any;
    }) {
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
                // Handle daily digest - maybe just log it or add to a different table/queue
                console.log(`Notification for user ${data.userId} added to daily digest queue`);
                return notification;
            }

            // 3. Schedule email with 5-minute delay
            // The worker will check if the notification is still unread after 5 mins
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
     * Process the delayed email check
     */
    static async processEmailCheck(jobData: any) {
        const { notificationId, userId, type, data } = jobData;

        const notification = await Notification.findByPk(notificationId);
        if (!notification || notification.isRead) {
            console.log(`Notification ${notificationId} already read or not found. Skipping email.`);
            return;
        }

        // Still unread, send the email
        const user = await SampleUser.findByPk(userId);
        if (!user) return;

        let subject = '';
        let templateName = '';

        switch (type) {
            case 'new_message':
                subject = `You have a new message from ${data.senderName}`;
                templateName = 'new-message';
                break;
            case 'application_status':
                subject = `Your application status: ${data.status}`;
                templateName = 'application-status';
                break;
            case 'job_alert':
                subject = 'New job matching your profile';
                templateName = 'job-alert';
                break;
            case 'job_status':
                subject = `Job ${data.result}`;
                templateName = 'job-status';
                break;
            default:
                subject = 'New Notification';
                templateName = 'notification'; // A generic one if needed
        }

        await QueueService.addEmailJob({
            type,
            to: (user as any).email,
            subject,
            templateName,
            data: { ...data, name: (user as any).email.split('@')[0] }, // Fallback for name
        });
    }

    /**
     * Send immediate emails (Welcome, Verification)
     */
    async sendImmediateEmail(userId: number, type: 'welcome' | 'verification', metadata: any) {
        const user = await SampleUser.findByPk(userId);
        if (!user) return;

        let subject = '';
        let templateName = '';

        if (type === 'welcome') {
            subject = 'Welcome to Job Finder';
            templateName = 'welcome';
        } else {
            subject = 'Verify your email address';
            templateName = 'verification';
        }

        await QueueService.addEmailJob({
            type,
            to: (user as any).email,
            subject,
            templateName,
            data: { ...metadata, name: (user as any).email.split('@')[0] },
        });
    }
    /**
     * Send daily digests to all users who have it enabled
     */
    static async sendDailyDigests() {
        const prefs = await NotificationPreference.findAll({
            where: { dailyDigest: true, emailEnabled: true },
        });

        for (const pref of prefs) {
            const unreadNotifications = await Notification.findAll({
                where: {
                    userId: pref.userId,
                    isRead: false,
                    createdAt: {
                        // Notifications from the last 24 hours
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
                            dashboardUrl: 'http://localhost:3000/dashboard', // Placeholder
                        },
                    });
                }
            }
        }
    }
}

// Update the queue processor to handle the check-and-send-email job
emailQueue.process('check-and-send-email', async (job) => {
    await NotificationService.processEmailCheck(job.data);
});

// Daily digest processor
emailQueue.process('daily-digest-cron', async () => {
    await NotificationService.sendDailyDigests();
});

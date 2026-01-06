import { emailQueue } from './queue.service';
import { getTitleByType, getMessageByType } from './notifications/notification-text-generators';
import { enrichMetadata } from './notifications/notification-metadata';
import { getAllNotifications, getOrCreatePreferences } from './notifications/notification-creator';
import { processEmailCheck, sendDailyDigests } from './notifications/notification-processor';
import { resolveRecipient } from './notifications/recipient-resolver';
import { handleNotificationLogic } from './notifications/notification-handler';

export class NotificationService {
    async notify(to: number | string, from: any, content: any) {
        try {
            const { userId, user } = await resolveRecipient(to);
            if (!user || !userId) return { success: false, error: 'User not found', recipient: to };

            const payload = typeof content === 'string' ? { message: content, type: 'custom' } : { ...content };
            const type = payload.type || 'custom';
            const enrichedMetadata = enrichMetadata(payload.metadata || {}, from, type);

            const title = payload.title || getTitleByType(type);
            const message = payload.message || getMessageByType(type, enrichedMetadata);
            const prefs = await getOrCreatePreferences(userId);

            const result = await handleNotificationLogic(type, userId, title, message, enrichedMetadata, prefs);

            return {
                success: true, userId, userEmail: user.email, type, title, message,
                notificationId: result.notificationId, emailQueued: result.emailQueued,
                preferences: { emailEnabled: prefs.emailEnabled, pushEnabled: prefs.pushEnabled, dailyDigest: prefs.dailyDigest },
                metadata: enrichedMetadata,
            };
        } catch (error: any) {
            console.error('❌ Error in notify method:', error);
            return { success: false, error: error.message, recipient: to, from };
        }
    }

    async getAllNotifications() { return await getAllNotifications(); }
    static async processEmailCheck(jobData: any) { return await processEmailCheck(jobData); }
    static async sendDailyDigests() { return await sendDailyDigests(); }
}

emailQueue.process('check-and-send-email', async (job) => { await NotificationService.processEmailCheck(job.data); });
emailQueue.process('daily-digest-cron', async () => { await NotificationService.sendDailyDigests(); });

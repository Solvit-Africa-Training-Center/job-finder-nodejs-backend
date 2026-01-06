import { sendImmediateEmail } from './notification-email';
import { createNotification } from './notification-creator';

/**
 * Handle different notification types
 */
export async function handleNotificationLogic(
    type: string,
    userId: number,
    title: string,
    message: string,
    metadata: any,
    prefs: any
) {
    let notificationId = null;
    let emailQueued = false;

    // Immediate email types (welcome, verification)
    if (type === 'welcome' || type === 'verification') {
        await sendImmediateEmail(userId, type, metadata);
        emailQueued = true;
        console.log(`✅ Immediate email queued for user ${userId}: ${type}`);
    }
    // Regular notifications (with potential delayed email)
    else {
        const notification = await createNotification({
            userId,
            title,
            message,
            type,
            metadata,
        });

        notificationId = notification.id;

        // Check if email was queued (based on preferences)
        if (prefs.emailEnabled && !prefs.dailyDigest) {
            emailQueued = true;
            console.log(`✅ In-app created: ${type} (email delayed)`);
        } else if (prefs.dailyDigest) {
            console.log(`✅ In-app created: ${type} (daily digest)`);
        } else {
            console.log(`✅ In-app created: ${type} (email disabled)`);
        }
    }

    return { notificationId, emailQueued };
}

import { SampleUser } from '../../database/models/sampleuser';
import { QueueService } from '../queue.service';

/**
 * Send immediate emails (Welcome, Verification)
 */
export async function sendImmediateEmail(
    userId: number,
    type: 'welcome' | 'verification',
    metadata: any
) {
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
 * Get email subject and template name based on notification type
 */
export function getEmailConfig(type: string, data: any) {
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
            templateName = 'notification';
    }

    return { subject, templateName };
}

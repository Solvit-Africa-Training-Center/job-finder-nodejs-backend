import {
    getLoginUrl,
    getJobUrl,
    getApplicationUrl,
    getMessageUrl,
    getVerificationUrl,
    getDashboardUrl
} from '../../config/urls';

/**
 * Get notification title based on type
 */
export function getTitleByType(type: string): string {
    switch (type) {
        case 'new_message':
            return 'New Message Received';
        case 'application_status':
            return 'Application Status Update';
        case 'job_alert':
            return 'New Job Match';
        case 'job_status':
            return 'Job Posting Update';
        default:
            return 'Notification';
    }
}

/**
 * Get notification message based on type and metadata
 */
export function getMessageByType(type: string, metadata: any): string {
    switch (type) {
        case 'new_message':
            return `You have a new message from ${metadata?.senderName || 'someone'}`;
        case 'application_status':
            return `Your application status for ${metadata?.jobTitle || 'a job'} is now ${metadata?.status || 'updated'}`;
        case 'job_alert':
            return `A new job matching your profile: ${metadata?.jobTitle || 'New Position'}`;
        case 'job_status':
            return `Your job posting ${metadata?.jobTitle || 'Position'} has been ${metadata?.result || 'updated'}`;
        default:
            return 'You have a new notification';
    }
}

/**
 * Enrich metadata with sender info and auto-generated URLs
 */
export function enrichMetadata(metadata: any, from: any, type: string): any {
    const enriched = { ...metadata };

    // Add sender information
    if (from) {
        enriched.senderName = enriched.senderName || from;
    }

    // Auto-generate URLs based on type
    switch (type) {
        case 'new_message':
            enriched.messageUrl = enriched.messageUrl || getMessageUrl(enriched.messageId || '1');
            enriched.loginUrl = enriched.loginUrl || getLoginUrl();
            break;

        case 'application_status':
            enriched.applicationUrl = enriched.applicationUrl || getApplicationUrl(enriched.applicationId || '1');
            enriched.loginUrl = enriched.loginUrl || getLoginUrl();
            break;

        case 'job_alert':
            enriched.jobUrl = enriched.jobUrl || getJobUrl(enriched.jobId || '1');
            enriched.loginUrl = enriched.loginUrl || getLoginUrl();
            break;

        case 'job_status':
            enriched.dashboardUrl = enriched.dashboardUrl || getDashboardUrl();
            break;

        case 'verification':
            enriched.verificationUrl = enriched.verificationUrl || getVerificationUrl(enriched.verificationCode || '123456');
            enriched.verificationLink = enriched.verificationLink || enriched.verificationUrl;
            break;

        case 'welcome':
            enriched.loginUrl = enriched.loginUrl || getLoginUrl();
            enriched.dashboardUrl = enriched.dashboardUrl || getDashboardUrl();
            break;

        default:
            enriched.loginUrl = enriched.loginUrl || getLoginUrl();
            enriched.dashboardUrl = enriched.dashboardUrl || getDashboardUrl();
    }

    // Add user name if available
    enriched.name = enriched.name || enriched.userName || 'User';

    return enriched;
}

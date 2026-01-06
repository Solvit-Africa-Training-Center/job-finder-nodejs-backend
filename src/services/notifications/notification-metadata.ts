import {
    getLoginUrl,
    getJobUrl,
    getApplicationUrl,
    getMessageUrl,
    getVerificationUrl,
    getDashboardUrl
} from '../../config/urls';

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

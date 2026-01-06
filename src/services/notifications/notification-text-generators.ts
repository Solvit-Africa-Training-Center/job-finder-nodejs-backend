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

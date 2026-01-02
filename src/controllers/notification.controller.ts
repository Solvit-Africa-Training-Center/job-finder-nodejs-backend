import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse } from '../utils/apiResponse';
import { EmailService } from '../services/email.service';
import { getLoginUrl, getJobUrl, getApplicationUrl, getMessageUrl, getVerificationUrl, getDashboardUrl } from '../config/urls';

const notificationService = new NotificationService();

export class NotificationController {
    /**
     * Direct test without Redis/Queue
     */
    directTest = asyncHandler(async (req: Request, res: Response) => {
        try {
            console.log('🐞 DEBUG: directTest called with:', JSON.stringify(req.body));
            let { email, userId, type, metadata } = req.body;

            // If no email provided but userId exists, try to get user's email
            if (!email && userId) {
                const { SampleUser } = require('../database/models/sampleuser');
                const user = await SampleUser.findByPk(userId);
                if (user) {
                    email = (user as any).email;
                }
            }

            if (!email) {
                return successResponse(res, {
                    statusCode: 400,
                    message: 'No recipient email found. Please provide "email" or a valid "userId" in the request body.',
                });
            }

            const emailServiceInstance = new EmailService();
            let subject = 'Direct Test Email';
            let templateName = type || 'welcome';

            // Use configured login URL and other helpers if not provided
            const emailData = {
                name: email.split('@')[0],
                recruiterName: 'Recruiter', // Default for job-status template
                loginUrl: getLoginUrl(),
                messageUrl: getMessageUrl('1'), // Default for testing
                jobUrl: getJobUrl('1'), // Default for testing
                applicationUrl: getApplicationUrl('1'), // Default for testing
                verificationLink: getVerificationUrl('123456'), // Default for testing
                verificationUrl: getVerificationUrl('123456'), // Required by template alias
                dashboardUrl: getDashboardUrl(), // Default for testing
                senderName: 'System', // Default fallback
                messagePreview: 'You have a new message', // Default fallback
                jobTitle: 'Software Engineer', // Default fallback
                companyName: 'Tech Co', // Default fallback
                status: 'Pending', // Default fallback
                result: 'Updated', // Default fallback
                reason: null, // Default fallback to prevent reference error
                ...metadata,
            };

            await emailServiceInstance.sendEmail(email, subject, templateName, emailData);
            return successResponse(res, {
                statusCode: 200,
                message: `Direct email sent to ${email} successfully!`,
            });
        } catch (error: any) {
            console.error('❌ Direct Test Error:', error);
            // Check if headers have already been sent to avoid "Headers already sent" error
            if (!res.headersSent) {
                return successResponse(res, {
                    statusCode: 500,
                    message: `Failed to send email: ${error.message}`,
                });
            }
        }
    });

    /**
     * Test triggering different types of notifications/emails
     */
    testNotification = asyncHandler(async (req: Request, res: Response) => {
        const { userId, type, metadata } = req.body;

        if (type === 'welcome' || type === 'verification') {
            await notificationService.sendImmediateEmail(userId, type, metadata);
        } else {
            await notificationService.createNotification({
                userId,
                title: this.getTitleByType(type),
                message: this.getMessageByType(type, metadata),
                type,
                metadata,
            });
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'Notification/Email triggered successfully. Check queue/logs.',
        });
    });

    private getTitleByType(type: string): string {
        switch (type) {
            case 'new_message': return 'New Message Received';
            case 'application_status': return 'Application Status Update';
            case 'job_alert': return 'New Job Match';
            case 'job_status': return 'Job Posting Update';
            default: return 'Notification';
        }
    }

    private getMessageByType(type: string, metadata: any): string {
        switch (type) {
            case 'new_message': return `You have a new message from ${metadata.senderName}`;
            case 'application_status': return `Your application status for ${metadata.jobTitle} is now ${metadata.status}`;
            case 'job_alert': return `A new job matching your profile: ${metadata.jobTitle}`;
            case 'job_status': return `Your job posting ${metadata.jobTitle} has been ${metadata.result}`;
            default: return 'You have a new notification';
        }
    }
}

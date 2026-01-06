import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { emailConfig } from '../config/email';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: false, // true for 465, false for other ports
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass,
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 10000, // 10 seconds
        });

        // Verify connection configuration
        this.transporter.verify((error, success) => {
            if (error) {
                console.error('❌ Transporter verification failed:', error);
            } else {
                console.log('✅ Server is ready to take our messages');
            }
        });
    }

    async sendEmail(
        to: string,
        subject: string,
        templateName: string,
        data: any
    ): Promise<void> {
        try {
            const templatePath = path.join(
                __dirname,
                '../templates/email',
                `${templateName}.ejs`
            );
            const layoutPath = path.join(
                __dirname,
                '../templates/email/layout.ejs'
            );

            // Render the specific template
            const body = (await ejs.renderFile(templatePath, data)) as string;

            // Render the layout with the body
            const html = (await ejs.renderFile(layoutPath, { body, ...data })) as string;

            // Create a plain text version (simplified)
            const text = body.replace(/<[^>]*>/g, '');

            const mailOptions = {
                from: `"${emailConfig.fromName}" <${emailConfig.from}>`,
                to,
                subject,
                html,
                text,
            };

            console.log(`Attempting to send email to ${to} using ${emailConfig.host}...`);
            await this.transporter.sendMail(mailOptions);
            console.log(`✅ Success: Email sent to ${to}: ${subject}`);
        } catch (error) {
            console.error('❌ Error in EmailService.sendEmail:', error);
            throw error;
        }
    }

    // Specific helper methods for templates
    async sendWelcomeEmail(name: string, email: string, loginUrl: string) {
        await this.sendEmail(email, 'Welcome to Job Finder', 'welcome', {
            name,
            loginUrl,
        });
    }

    async sendNewMessageEmail(name: string, email: string, senderName: string, messagePreview: string, messageUrl: string) {
        await this.sendEmail(email, `New message from ${senderName}`, 'new-message', {
            name,
            senderName,
            messagePreview,
            messageUrl,
        });
    }

    async sendApplicationStatusEmail(name: string, email: string, jobTitle: string, companyName: string, status: string, applicationUrl: string) {
        await this.sendEmail(email, `Application Status: ${status}`, 'application-status', {
            name,
            jobTitle,
            companyName,
            status,
            applicationUrl,
        });
    }

    async sendJobAlertEmail(name: string, email: string, jobTitle: string, companyName: string, location: string, salaryRange: string, jobUrl: string) {
        await this.sendEmail(email, 'New job matching your profile', 'job-alert', {
            name,
            jobTitle,
            companyName,
            location,
            salaryRange,
            jobUrl,
        });
    }

    async sendJobStatusEmail(recruiterName: string, email: string, jobTitle: string, result: string, reason: string | null, dashboardUrl: string) {
        await this.sendEmail(email, `Job Posting ${result}`, 'job-status', {
            recruiterName,
            jobTitle,
            result,
            reason,
            dashboardUrl,
        });
    }

    async sendVerificationEmail(name: string, email: string, verificationCode: string, verificationUrl: string) {
        await this.sendEmail(email, 'Verify your email address', 'verification', {
            name,
            verificationCode,
            verificationUrl,
        });
    }
}

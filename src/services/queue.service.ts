import Bull from 'bull';
import { redisConfig } from '../config/email';
import { EmailService } from './email.service';

const emailService = new EmailService();

export const emailQueue = new Bull('email-queue', {
    redis: {
        host: redisConfig.host,
        port: redisConfig.port,
        password: redisConfig.password,
    },
});

// Process jobs
emailQueue.process(async (job) => {
    const { type, to, subject, templateName, data } = job.data;
    console.log(`Processing email job: ${type} to ${to}`);
    await emailService.sendEmail(to, subject, templateName, data);
});

emailQueue.on('completed', (job) => {
    console.log(`Email job ${job.id} completed`);
});

emailQueue.on('failed', (job, err) => {
    console.error(`Email job ${job.id} failed:`, err);
});

export class QueueService {
    static async addEmailJob(data: {
        type: string;
        to: string;
        subject: string;
        templateName: string;
        data: any;
    }) {
        await emailQueue.add(data, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 5000,
            },
        });
    }
}

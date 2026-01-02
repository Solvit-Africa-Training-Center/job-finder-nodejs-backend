import dotenv from 'dotenv';
dotenv.config();

export const emailConfig = {
    host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.MAIL_PORT || '2525'),
    user: process.env.MAIL_USERNAME || '',
    pass: process.env.MAIL_PASSWORD || '',
    from: process.env.MAIL_FROM_ADDRESS || 'no-reply@jobfinder.com',
    fromName: process.env.MAIL_FROM_NAME || 'E-VUBA CONNECT',
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    useSendgrid: !!process.env.SENDGRID_API_KEY,
};

export const redisConfig = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
};

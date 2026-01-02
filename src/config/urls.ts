import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    frontendUrl: process.env.FRONTEND_URL || 'https://solvit.africa',
};

export const getLoginUrl = () => `${appConfig.frontendUrl}/login`;
export const getVerificationUrl = (code: string) => `${appConfig.frontendUrl}/verify?code=${code}`;
export const getJobUrl = (jobId: string) => `${appConfig.frontendUrl}/jobs/${jobId}`;
export const getApplicationUrl = (appId: string) => `${appConfig.frontendUrl}/applications/${appId}`;
export const getMessageUrl = (msgId: string) => `${appConfig.frontendUrl}/messages/${msgId}`;
export const getDashboardUrl = () => `${appConfig.frontendUrl}/dashboard`;

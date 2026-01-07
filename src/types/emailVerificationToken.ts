import { emailVerificationTokenAttributes } from '../database/models/emailVerificationToken';

export type createEmailVerificationToken = Pick<
  emailVerificationTokenAttributes,
  'userId' | 'token' | 'expiresAt'
>;

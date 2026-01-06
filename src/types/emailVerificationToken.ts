import { EmailVerificationTokenAttributes } from 'src/database/models/EmailVerificationToken';

export type createEmailVerificationToken = Pick<
  EmailVerificationTokenAttributes,
  'userId' | 'token'
>;

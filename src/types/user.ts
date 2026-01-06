import { UserAttributes } from 'src/database/models/User';

export type createUserAttributes = Pick<
  UserAttributes,
  'firstName' | 'lastName' | 'email' | 'password' | 'role'
>;

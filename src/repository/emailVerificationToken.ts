import {
  EmailVerificationToken,
  EmailVerificationTokenAttributes,
} from '../database/models/EmailVerificationToken';
import { createEmailVerificationToken } from '../types';

export class EmailVerificationTokenRepository {
  static fetchAll = async (
    filter?: Partial<EmailVerificationTokenAttributes>,
  ) => {
    return await EmailVerificationToken.findAll({ where: { ...filter } });
  };

  static fetchOne = async (
    filter: Partial<EmailVerificationTokenAttributes>,
  ) => {
    return await EmailVerificationToken.findOne({ where: { ...filter } });
  };

  static create = async (token: createEmailVerificationToken) => {
    return await EmailVerificationToken.create({ ...token });
  };

  static update = async (token: EmailVerificationToken) => {
    return await EmailVerificationToken.update(
      { ...token },
      { where: { id: token.id } },
    );
  };
  static delete = async (filter: Partial<EmailVerificationTokenAttributes>) => {
    return await EmailVerificationToken.destroy({ where: { ...filter } });
  };
}

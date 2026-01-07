import {
  EmailVerificationToken,
  emailVerificationTokenAttributes,
} from '../database/models/emailVerificationToken';
import { createEmailVerificationToken } from '../types';
import { Op } from 'sequelize';

export class EmailVerificationTokenRepository {
  static fetchAll = async (
    filter?: Partial<emailVerificationTokenAttributes>,
  ) => {
    return await EmailVerificationToken.findAll({ where: { ...filter } });
  };

  static fetchOne = async (
    filter: Partial<emailVerificationTokenAttributes>,
  ) => {
    return await EmailVerificationToken.findOne({
      where: { ...filter, expiresAt: { [Op.gt]: new Date() } },
    });
  };

  static create = async (token: createEmailVerificationToken) => {
    return await EmailVerificationToken.create({ ...token });
  };

  static update = async (token: Partial<EmailVerificationToken>) => {
    return await EmailVerificationToken.update(
      { ...token },
      { where: { userId: token.userId } },
    );
  };
  static delete = async (filter: Partial<emailVerificationTokenAttributes>) => {
    return await EmailVerificationToken.destroy({ where: { ...filter } });
  };
}

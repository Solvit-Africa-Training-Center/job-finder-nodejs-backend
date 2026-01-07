import {
  PasswordResetToken,
  passwordResetTokenAttributes,
} from '../database/models/passwordResetToken';
import { createEmailVerificationToken } from '../types';
import { Op } from 'sequelize';

export class PasswordResetTokenRepository {
  static fetchAll = async (filter?: Partial<passwordResetTokenAttributes>) => {
    return await PasswordResetToken.findAll({ where: { ...filter } });
  };

  static fetchOne = async (filter: Partial<passwordResetTokenAttributes>) => {
    return await PasswordResetToken.findOne({
      where: { ...filter, expiresAt: { [Op.gt]: new Date() } },
    });
  };

  static create = async (token: createEmailVerificationToken) => {
    return await PasswordResetToken.create({ ...token });
  };

  static update = async (token: Partial<PasswordResetToken>) => {
    return await PasswordResetToken.update(
      { ...token },
      { where: { userId: token.userId } },
    );
  };
  static delete = async (filter: Partial<PasswordResetToken>) => {
    return await PasswordResetToken.destroy({ where: { ...filter } });
  };
}

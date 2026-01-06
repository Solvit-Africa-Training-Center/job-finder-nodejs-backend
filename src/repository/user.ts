import { User, UserAttributes } from '../database/models/User';
import { createUserAttributes } from '../types/user';

export class UserRepository {
  static fetchAll = async (filter?: Partial<UserAttributes>) => {
    return await User.findAll({ where: { ...filter } });
  };
  static fetchOne = async (filter: Partial<UserAttributes>) => {
    return await User.findOne({ where: { ...filter } });
  };
  static create = async (newUser: createUserAttributes) => {
    return await User.create({ ...newUser });
  };
  static update = async (user: User) => {
    return await User.update({ ...user }, { where: { id: user.id } });
  };
  static delete = async (filter: Partial<UserAttributes>) => {
    return await User.destroy({ where: { ...filter } });
  };
}

import { UserRepository } from '../repository';
import { createUserAttributes } from 'src/types/user';

export class UserService {
  static fetchAllUsers = async () => {
    return await UserRepository.fetchAll();
  };

  static createUser = async (userData: createUserAttributes) => {
    return await UserRepository.create(userData);
  };
}

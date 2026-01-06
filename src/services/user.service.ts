import { SampleUser } from '../database/models';

export class UserService {
  fetchAllUsers = async () => {
    const users = await SampleUser.findAll();
    return users;
  };
}

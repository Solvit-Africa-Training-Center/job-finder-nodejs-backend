import { SampleUser } from '../database/models/sampleuser';

export class UserService {
  fetchAllUsers = async () => {
    try {
      const users = await SampleUser.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  };
}

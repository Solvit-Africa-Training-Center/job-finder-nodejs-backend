import { SampleUser } from '../database/models/sampleuser';

export class UserService {
  fetchAllUsers = async () => {
    const users = await SampleUser.findAll();
    return users;
  };
}

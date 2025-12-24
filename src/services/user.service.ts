import { SampleUser } from "src/database/models/sampleuser";

interface Models {
  SampleUser: typeof SampleUser; // the initialized model class
}

export class UserService {
  private models: Models;

  constructor(models: Models) {
    this.models = models;
  }
  fetchAllUsers = async () => {
    try {
      const users = await this.models.SampleUser.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  };
}

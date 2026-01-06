import { SampleUser } from '../database/models/sampleuser';

export class UserService {
  
  fetchAllUsers = async () => {
    const users = await SampleUser.findAll({
      attributes: ['id', 'email', 'role', 'isActive', 'isBlocked', 'lastLoginAt'],
    });
    return users;
  };

  
  blockUser = async (userId: number) => {
    const user = await SampleUser.findByPk(userId);
    if (!user) throw new Error('User not found');

    if (user.role === 'ADMIN') {
      throw new Error('Cannot block admin');
    }

    user.isBlocked = true;
    user.blockedAt = new Date();
    await user.save();

    return user;
  };

  
  unblockUser = async (userId: number) => {
    const user = await SampleUser.findByPk(userId);
    if (!user) throw new Error('User not found');

    user.isBlocked = false;
    user.blockedAt = undefined;
    user.failedLoginAttempts = 0;
    await user.save();

    return user;
  };

  activateUser = async (userId: number) => {
    const user = await SampleUser.findByPk(userId);
    if (!user) throw new Error('User not found');

    user.isActive = true;
    await user.save();
    return user;
  };

  deactivateUser = async (userId: number) => {
    const user = await SampleUser.findByPk(userId);
    if (!user) throw new Error('User not found');

    user.isActive = false;
    await user.save();
    return user;
  };

}

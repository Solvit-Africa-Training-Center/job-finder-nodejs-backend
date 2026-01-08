import { SampleUser } from '../database/models';
import { UserProfile } from '../database/models/userprofile.model';
import { AppError } from '../utils';

export class UserService {
  private async findUserOrFail(userId: number): Promise<SampleUser> {
    const user = await SampleUser.findByPk(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const bcrypt = await import('bcrypt');
    return bcrypt.default.compare(password, hashedPassword);
  }

  async createUser(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) {
    const existingUser = await SampleUser.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    const user = await SampleUser.create({
      email,
      password,
    });

    await UserProfile.create({
      userId: user.id,
      firstName,
      lastName,
      completionPercentage: 0,
    });

    return this.getUserWithProfile(user.id);
  }

  async getAllUsers(limit = 10, offset = 0) {
    const { count, rows } = await SampleUser.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'email', 'role', 'isActive', 'isBlocked', 'createdAt'],
      include: [
        {
          model: UserProfile,
          as: 'profile',
          required: false,
          attributes: ['firstName', 'lastName', 'username'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return {
      total: count,
      limit,
      offset,
      data: rows,
    };
  }

  async getUser(userId: number) {
    return this.getUserWithProfile(userId);
  }

  private async getUserWithProfile(userId: number) {
    const user = await SampleUser.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: UserProfile,
          as: 'profile',
          required: false,
        },
      ],
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async updateUserAccount(
    userId: number,
    data: {
      email?: string;
      isActive?: boolean;
    },
  ) {
    const user = await this.findUserOrFail(userId);

    if (data.email && data.email !== user.email) {
      const existingUser = await SampleUser.findOne({
        where: { email: data.email },
      });
      if (existingUser) {
        throw new AppError('Email already in use', 409);
      }
      user.email = data.email;
    }

    if (data.isActive !== undefined) {
      user.isActive = data.isActive;
    }

    await user.save();
    return this.getUserWithProfile(user.id);
  }

  async updateProfile(
    userId: number,
    data: {
      firstName?: string;
      lastName?: string;
      username?: string;
      profilePicture?: string;
    },
  ) {
    const user = await this.findUserOrFail(userId);

    let profile = await UserProfile.findOne({ where: { userId } });

    if (!profile) {
      profile = await UserProfile.create({
        userId,
        completionPercentage: 0,
      });
    }

    if (data.username && data.username !== profile.username) {
      const existingUsername = await UserProfile.findOne({
        where: { username: data.username },
      });
      if (existingUsername) {
        throw new AppError('Username already taken', 409);
      }
    }

    Object.assign(profile, data);

    profile.completionPercentage = this.calculateProfileCompletion({
      email: user.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      profilePicture: profile.profilePicture,
    });

    await profile.save();
    return this.getUserWithProfile(userId);
  }

  private calculateProfileCompletion(profileData: {
    email?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    profilePicture?: string;
  }): number {
    const fields = Object.values(profileData).filter(Boolean).length;
    return Math.round((fields / 5) * 100);
  }

  async updateRole(
    userId: number,
    newRole: 'admin' | 'recruiter' | 'candidate',
  ) {
    const user = await this.findUserOrFail(userId);

    if (user.role === newRole) {
      throw new AppError('User already has this role', 400);
    }

    user.role = newRole;
    await user.save();

    return this.getUserWithProfile(userId);
  }

  async activateUser(userId: number) {
    const user = await this.findUserOrFail(userId);

    if (user.isActive) {
      throw new AppError('User is already active', 400);
    }

    user.isActive = true;
    await user.save();

    return this.getUserWithProfile(userId);
  }

  async deactivateUser(userId: number) {
    const user = await this.findUserOrFail(userId);

    if (!user.isActive) {
      throw new AppError('User is already inactive', 400);
    }

    user.isActive = false;
    await user.save();

    return this.getUserWithProfile(userId);
  }

  async blockUser(userId: number) {
    const user = await this.findUserOrFail(userId);

    if (user.role === 'admin') {
      throw new AppError('Cannot block admin users', 403);
    }

    if (user.isBlocked) {
      throw new AppError('User is already blocked', 400);
    }

    user.isBlocked = true;
    user.blockedAt = new Date();
    await user.save();

    return this.getUserWithProfile(userId);
  }

  async unblockUser(userId: number) {
    const user = await this.findUserOrFail(userId);

    if (!user.isBlocked) {
      throw new AppError('User is not blocked', 400);
    }
    user.isBlocked = false;
    user.blockedAt = null;
    await user.save();

    return this.getUserWithProfile(userId);
  }
}

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository';
import { createUserAttributes } from '../types/user';

export class AuthService {
  static async registerUser(userData: createUserAttributes) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return await UserRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }

  static async login(email: string, password: string) {
    const user = await UserRepository.fetchOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '15m' },
    );

    return { accessToken, user };
  }
}

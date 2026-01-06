import bcrypt from 'bcrypt';
import { jwtConfig } from '../config';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { SampleUser } from '../database/models';

export const loginUser = async (
  email: string,
  password: string,
) => {
  const user = await SampleUser.findOne({ where: { email } });

 
  if (!user) {
    throw new Error('Invalid credentials');
  }

  
  if (!user.isActive) {
    throw new Error('Account deactivated');
  }

  
  if (user.isBlocked) {
    throw new Error('Account blocked');
  }

  
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    user.failedLoginAttempts += 1;

    
    if (user.failedLoginAttempts >= 5 && user.role !== 'ADMIN') {
      user.isBlocked = true;
      user.blockedAt = new Date();
    }

    await user.save();
    throw new Error('Invalid credentials');
  }

  
  user.failedLoginAttempts = 0;
  user.lastLoginAt = new Date();
  await user.save();

  const token = jwt.sign(
    { id: user.id, role: user.role },
    jwtConfig.secret as Secret,
    { expiresIn: jwtConfig.expiresIn } as SignOptions,
  );

  
  return {
    token,
    user: {
        id: user.id,
        email: user.email,
        role: user.role,
        lastLoginAt: user.lastLoginAt,
        }
    
  };
};

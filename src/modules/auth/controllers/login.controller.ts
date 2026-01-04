import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import RefreshToken from '../../../models/RefreshToken';
import { generateToken, generateRefreshToken } from '../../../utils/jwt';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Account is deactivated'
      });
    }
    
    // Generate tokens
    const accessToken = generateToken(user.id, user.email, user.userType);
    const refreshToken = generateRefreshToken(user.id);
    
    // Save refresh token
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });
    
    // Update last login
    await user.update({ lastLogin: new Date() });
    
    // Return response
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        }
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      });
    }
    
    // Find and revoke token
    const token = await RefreshToken.findOne({ 
      where: { token: refreshToken } 
    });
    
    if (token) {
      await token.update({ isRevoked: true });
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

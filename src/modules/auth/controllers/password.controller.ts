import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../../../models/User";
import PasswordResetToken from "../../../models/PasswordResetToken";

const PASSWORD_RESET_SECRET = process.env.JWT_SECRET + "_password";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required"
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({
        success: true,
        message: "If an account exists, reset instructions will be sent"
      });
    }

    const resetToken = jwt.sign(
      { id: user.id, type: "password_reset" },
      PASSWORD_RESET_SECRET,
      { expiresIn: "1h" }
    );

    await PasswordResetToken.create({
      token: resetToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    });

    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({
      success: true,
      message: "Password reset instructions sent"
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Token and new password are required"
      });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, PASSWORD_RESET_SECRET);
    } catch {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired token"
      });
    }

    const tokenRecord = await PasswordResetToken.findOne({
      where: {
        token,
        isUsed: false,
        expiresAt: {
          [Op.gt]: new Date()
        }
      }
    });

    if (!tokenRecord) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired token"
      });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    await tokenRecord.update({ isUsed: true });

    res.json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

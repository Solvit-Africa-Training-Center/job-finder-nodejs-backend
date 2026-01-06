import { SampleUser } from '../database/models/sampleuser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    async register(data: any) {
        const { email, password } = data;

        // Check if user exists
        const existingUser = await SampleUser.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await SampleUser.create({
            email,
            password: hashedPassword,
        });

        return user;
    }

    async login(data: any) {
        const { email, password } = data;

        // Find user
        const user = await SampleUser.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            (process.env.JWT_SECRET as string) || 'your_secret_key',
            { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1d' }
        );

        return { user, token };
    }
}

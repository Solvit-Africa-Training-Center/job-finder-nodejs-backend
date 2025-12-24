import { MockUser } from '../types/blog.interface';

const mockUsers: MockUser[] = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@gmail.com',
        role: 'admin',
    },
    {
        id: 2,
        username: 'kabano',
        email: 'kabano@gmail.com',
        role: 'user',
    },
    {
        id: 3,
        username: 'keza',
        email: 'keza@gmail.com',
        role: 'user',
    },
];

export class MockUserService {

    static getUserById(userId: number): MockUser | undefined {
        return mockUsers.find((user) => user.id === userId);
    }

    static isAdmin(userId: number): boolean {
        const user = this.getUserById(userId);
        return user?.role === 'admin';
    }

    static getAllUsers(): MockUser[] {
        return mockUsers;
    }
}
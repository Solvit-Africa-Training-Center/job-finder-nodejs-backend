import { MockUser } from '../types/blog.interface';

const mockUsers: MockUser[] = [
  {
    id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    username: 'admin',
    email: 'admin@gmail.com',
    role: 'admin',
  },
  {
    id: 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
    username: 'kabano',
    email: 'kabano@gmail.com',
    role: 'user',
  },
  {
    id: 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f',
    username: 'keza',
    email: 'keza@gmail.com',
    role: 'user',
  },
];

export class MockUserService {
  static getUserById(userId: string): MockUser | undefined {
    return mockUsers.find((user) => user.id === userId);
  }

  static isAdmin(userId: string): boolean {
    const user = this.getUserById(userId);
    return user?.role === 'admin';
  }

  static getAllUsers(): MockUser[] {
    return mockUsers;
  }

  static getUserByEmail(email: string): MockUser | undefined {
    return mockUsers.find((user) => user.email === email);
  }

  static getUserByUsername(username: string): MockUser | undefined {
    return mockUsers.find((user) => user.username === username);
  }
}

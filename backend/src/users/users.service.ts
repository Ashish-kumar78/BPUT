import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

export type UserRole = 'student' | 'college_admin' | 'faculty';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  passwordHash: string;
  isActive: boolean;
}

export type SafeUser = Omit<User, 'passwordHash'>;

const users: User[] = [
  {
    id: 'u-1001',
    email: 'student@collegeflow.edu',
    firstName: 'Aarav',
    lastName: 'Sharma',
    role: 'student',
    passwordHash: bcrypt.hashSync('password123', 10),
    isActive: true,
  },
  {
    id: 'u-1002',
    email: 'admin@collegeflow.edu',
    firstName: 'Nisha',
    lastName: 'Patel',
    role: 'college_admin',
    passwordHash: bcrypt.hashSync('password123', 10),
    isActive: true,
  },
  {
    id: 'u-1003',
    email: 'faculty@collegeflow.edu',
    firstName: 'Rohit',
    lastName: 'Verma',
    role: 'faculty',
    passwordHash: bcrypt.hashSync('password123', 10),
    isActive: true,
  },
];

@Injectable()
export class UsersService {
  findByEmail(email: string) {
    return users.find((user) => user.email.toLowerCase() === String(email).toLowerCase());
  }

  list() {
    return users;
  }

  sanitize(user: User): SafeUser {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}

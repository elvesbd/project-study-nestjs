import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UsersServices {
  public users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): User {
    this.users.push(user);
    return user;
  }

  getUser(email: string): User {
    const user = this.users.filter((user) => user.email === email);
    if (user && Array.isArray(user) && user.length > 0) {
      return user[0];
    }
    throw new NotFoundException('User not found');
  }

  removeUser(email: string): User[] {
    const remainingUsers = this.users.filter((user) => user.email !== email);
    this.users = remainingUsers;
    return remainingUsers;
  }
}

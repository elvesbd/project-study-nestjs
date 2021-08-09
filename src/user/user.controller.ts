import { Body, Get, Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { User } from './interface/user';
import { UsersServices } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServices) {}

  @Get()
  getUsers(): User[] {
    return this.usersService.getUsers();
  }

  @Get('/:email')
  getUser(email: string): User {
    return this.usersService.getUser(email);
  }

  @Post('/create')
  createUser(@Body() user: User): User {
    return this.usersService.addUser(user);
  }

  @Delete('/:email')
  deleteUser(@Param('email') email: string): User[] {
    return this.usersService.removeUser(email);
  }
}

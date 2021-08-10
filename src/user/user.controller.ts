import {
  BadRequestException,
  Body,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserDto, UserParamsDto } from './dto/user.dto';
import { User } from './interface/user';
import { UsersServices } from './user.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServices) {}

  @Get()
  getUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort') sort: boolean,
    @Body() data: UserDto,
  ): User[] {
    return this.usersService.getUsers();
  }

  @Get('/:email')
  async getUser(@Param() param: UserParamsDto): Promise<User> {
    try {
      return await this.usersService.getUser(param.email);
    } catch (err) {
      throw new BadRequestException('test');
    }
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  async createUser(@Body() user: UserDto): Promise<User> {
    return this.usersService.addUser(user);
  }

  @Delete('/:email')
  deleteUser(@Param() params: UserParamsDto): User[] {
    return this.usersService.removeUser(params.email);
  }
}

import {
  Body,
  Get,
  ParseIntPipe,
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServices) {}

  @Get()
  getUsers(
    @Param('id') id: number,
    @Query('sort') sort: boolean,
    @Body() data: UserDto,
  ): User[] {
    return this.usersService.getUsers();
  }

  @Get('/:email')
  getUser(@Param() param: UserParamsDto): User {
    return this.usersService.getUser(param.email);
  }

  @UsePipes(ValidationPipe)
  @Post('/create')
  createUser(@Body() user: UserDto): User {
    return this.usersService.addUser(user);
  }

  @Delete('/:email')
  deleteUser(@Param() params: UserParamsDto): User[] {
    return this.usersService.removeUser(params.email);
  }
}

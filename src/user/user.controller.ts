import {
  Body,
  Get,
  Header,
  Post,
  Req,
  Res,
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
import { Request, Response } from 'express';
import { ParseIntPipe } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { Redirect } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServices) {}

  @Get()
  getUsers(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort') sort: boolean,
    @Body() data: UserDto,
    @Req() req: Request,
  ): User[] {
    return this.usersService.getUsers();
  }

  @HttpCode(204)
  @Redirect('')
  @Header('Cache-Control', 'none')
  @Get('/:email')
  getUser(
    @Param() param: UserParamsDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const data = this.usersService.getUser(param.email);
    res.status(HttpStatus.CREATED).json([]);
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

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';
import { TaskDto } from './dto/task.dto';
import { UsePipes } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = await this.taskService.getAllTasks();
    return res.status(200).send(data);
  }

  @UsePipes(ValidationPipe)
  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    return await this.taskService.getTask(id);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    console.log(task);
    const data = await this.taskService.addTask(task);
    return res.status(200).send(data);
  }

  @UsePipes(ValidationPipe)
  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string, @Res() res: Response) {
    const data = await this.taskService.getTask(id);
    return res.status(200).send(data);
  }
}

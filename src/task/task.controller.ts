import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';
import { QueryParamDto, TaskDto, TaskParamDto } from './dto/task.dto';
import { UsePipes } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Query } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = await this.taskService.getAllTasks();
    return res.status(200).send(data);
  }

  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  @Get('/filter/data')
  async filterTaskById(@Query() reqParam: QueryParamDto, @Res() res: Response) {
    console.log(reqParam);
    const data = await this.taskService.filterTask(reqParam.filter);
    return res.status(200).send(data);
  }

  @UsePipes(ValidationPipe)
  @Get('/:id')
  async getTaskById(@Param('id') reqParam: TaskParamDto) {
    return await this.taskService.getTask(reqParam.id);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = await this.taskService.addTask(task);
    return res.status(200).send(data);
  }

  @UsePipes(ValidationPipe)
  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string) {
    return await this.taskService.getTask(id);
  }
}

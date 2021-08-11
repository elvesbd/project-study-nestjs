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
import { TaskDto } from './dto/task.dto';
import { UsePipes } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = this.taskService.getAllTasks();
    return res.status(200).send(data);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    console.log(task);
    const data = this.taskService.addTask(task);
    return res.status(200).send(data);
  }
}

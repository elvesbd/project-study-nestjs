import { Controller, Get, Res } from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Res() res: Response) {
    const data = this.taskService.getAllTasks();
    return res.status(200).send(data);
  }
}

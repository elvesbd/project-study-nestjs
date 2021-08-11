import { Injectable } from '@nestjs/common';
import { Task } from './interface/task';
import { TaskStoreService } from './task-store.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly taskService: TaskStoreService) {}

  public async addTask(task: Task): Promise<Task> {
    task.uuid = uuid();
    task.completed = false;
    task.description = 'dummy';
    task.ownder = 'Tarun';
    task.duration = 2;
    return this.taskService.addTask(task);
  }

  public async getTask(id: string): Promise<Task> {
    return this.taskService.getTask(id);
  }

  public async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
}

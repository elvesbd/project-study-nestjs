import { Injectable } from '@nestjs/common';
import { Task } from './interface/task';
import { TaskStoreService } from './task-store.service';

@Injectable()
export class TaskService {
  constructor(private readonly taskService: TaskStoreService) {}

  public async addTask(task: Task): Promise<Task> {
    return this.taskService.addTask(task);
  }

  public async getTask(id: string): Promise<Task> {
    return this.taskService.getTask(id);
  }

  public async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
}

import { Injectable } from '@nestjs/common';
import { Task } from './interface/task';
import { TaskStoreService } from './task-store.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly taskStoreService: TaskStoreService) {}

  public async getAllTasks(): Promise<Task[]> {
    return this.taskStoreService.getAllTasks();
  }

  public async filterTask(filter): Promise<Task[]> {
    return this.taskStoreService.filterTask(filter);
  }

  public async getTask(id: string): Promise<Task> {
    return this.taskStoreService.getTask(id);
  }

  public async addTask(task: Task): Promise<Task> {
    task.uuid = uuid();
    task.completed = false;
    task.description = 'dummy';
    task.ownder = 'Tarun';
    task.duration = 2;
    return this.taskStoreService.addTask(task);
  }

  public async deleteTasks(id: string): Promise<Task[]> {
    return this.taskStoreService.deleteTask(id);
  }
}

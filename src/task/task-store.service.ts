import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Task } from './interface/task';

@Injectable()
export class TaskStoreService {
  public tasks: Task[] = [];

  public async getAllTasks(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  public async filterTask(filter): Promise<Task[]> {
    if (!filter) {
      return Promise.resolve(this.tasks);
    }
    return Promise.resolve(
      this.tasks.filter((i: Task) => {
        return i.duration > 0;
      }),
    );
  }

  public async getTask(id: string): Promise<Task> {
    const task = this.tasks.filter((task) => task.uuid === id);

    if (task && task.length > 0) {
      return Promise.resolve(task[0]);
    }
    throw new NotFoundException('task not found');
  }

  public async addTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    console.log(task, this.tasks);
    return Promise.resolve(task);
  }

  public async deleteTask(id: string): Promise<Task[]> {
    const task = this.tasks.filter((task) => task.uuid === id);

    if (task.length === 0) {
      throw new NotFoundException('task not found');
    }

    const newTask = this.tasks.filter((task) => task.uuid != id);
    this.tasks = newTask;
    return Promise.resolve(this.tasks);
  }
}

import { Task } from '@modules/task/domain/model/task.aggregate';
import {
  ITaskRepository,
  Tasks,
} from '@modules/task/domain/model/task.repository';
import { Result } from 'types-ddd';

export class TaskRepository implements ITaskRepository {
  save(task: Task): Promise<Result<Task>> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Result<Tasks>> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Result<Task>> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Result<string>> {
    throw new Error('Method not implemented.');
  }
  finishTask(id: string): Promise<Result<Task>> {
    throw new Error('Method not implemented.');
  }
}

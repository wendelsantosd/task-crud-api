import { Result } from 'types-ddd';
import { Task } from './task.aggregate';

export type Tasks = {
  tasks: Task[];
  medata: {
    count: number;
  };
};

export interface ITaskRepository {
  save(task: Task): Promise<Result<Task>>;
  getAll(): Promise<Result<Tasks>>;
  getById(id: string): Promise<Result<Task>>;
  delete(id: string): Promise<Result<string>>;
  finishTask(id: string): Promise<Result<Task>>;
}

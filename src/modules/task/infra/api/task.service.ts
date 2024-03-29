import { makeCreateTask } from '@modules/task/application/factories/createTask.factory';
import { makeDeleteTask } from '@modules/task/application/factories/makeDeleteTask.factory';
import { makeStatusTask } from '@modules/task/application/factories/makeStatusTask.factory';
import { makeGetTaskById } from '@modules/task/application/factories/makeGetTaskById.factory';
import { makeGetTasks } from '@modules/task/application/factories/makeGetTasks.factory ';
import { makeUpdateTask } from '@modules/task/application/factories/makeUpdateTask.factory';
import { Task } from '@modules/task/domain/model/task.aggregate';
import { Tasks } from '@modules/task/domain/model/task.repository';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { UpdateTaskDTO } from './dtos/updateTask.dto';

@Injectable()
export class TaskService {
  async getAll(): Promise<Result<Tasks>> {
    const task = await makeGetTasks().execute();

    if (task.isFail()) return Result.fail(task.error());

    return Result.Ok(task.value());
  }

  async findById(id: string): Promise<Result<Task>> {
    const task = await makeGetTaskById().execute({ id });

    if (task.isFail()) return Result.fail(task.error());

    return task;
  }

  async create(data: CreateTaskDTO): Promise<Result<Task>> {
    const task = await makeCreateTask().execute(data);

    if (task.isFail()) return Result.fail(task.error());

    return task;
  }

  async update(data: UpdateTaskDTO, id: string): Promise<Result<Task>> {
    const task = await makeUpdateTask().execute({ data, id });

    if (task.isFail()) return Result.fail(task.error());

    return task;
  }

  async delete(id: string): Promise<Result<string>> {
    const message = await makeDeleteTask().execute({ id });

    if (message.isFail()) return Result.fail(message.error());

    return message;
  }

  async status(id: string, status: string): Promise<Result<string>> {
    const message = await makeStatusTask().execute({ id, status });

    if (message.isFail()) return Result.fail(message.error());

    return message;
  }
}

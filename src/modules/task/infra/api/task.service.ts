import { makeCreateTask } from '@modules/task/application/factories/createTask.factory';
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

  async create(data: CreateTaskDTO): Promise<Result<Task>> {
    const task = await makeCreateTask().execute(data);

    if (task.isFail()) return Result.fail(task.error());

    return Result.Ok(task.value());
  }

  async update(data: UpdateTaskDTO, id: string): Promise<Result<Task>> {
    const task = await makeUpdateTask().execute({ data, id });

    if (task.isFail()) return Result.fail(task.error());

    return task;
  }
}

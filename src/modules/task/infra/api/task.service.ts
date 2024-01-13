import { makeCreateTask } from '@modules/task/application/factories/createTask.factory';
import { Task } from '@modules/task/domain/model/task.aggregate';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { CreateTaskDTO } from './dtos/createTask.dto';

@Injectable()
export class TaskService {
  async create(data: CreateTaskDTO): Promise<Result<Task>> {
    const task = await makeCreateTask().execute(data);

    if (task.isFail()) return Result.fail(task.error());

    return Result.Ok(task.value());
  }
}

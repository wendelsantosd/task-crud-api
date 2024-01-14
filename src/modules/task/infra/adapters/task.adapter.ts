import { Task } from '@modules/task/domain/model/task.aggregate';
import { tasks } from '@prisma/client';
import { IAdapter, ID, IResult, Result } from 'types-ddd';
import { TaskDBO } from '../repository/task.dbo';

export class AdapterTaskDBOToDomain implements IAdapter<TaskDBO, Task> {
  public build(target: TaskDBO): IResult<Task> {
    const task = Task.create({
      id: ID.create(target.id),
      title: target.title,
      description: target.description,
      priority: target.priority,
      status: target.status,
      completionDate: target.completionDate,
      createdAt: target.createdAt ?? undefined,
      updatedAt: target.updatedAt ?? undefined,
    });

    if (task.isFail()) return Result.fail(task.error());

    return Result.Ok(task.value());
  }

  public prepare(taskDB: tasks): TaskDBO {
    return {
      id: taskDB.id,
      title: taskDB.title,
      description: taskDB.description,
      priority: taskDB.priority,
      status: taskDB.status,
      completionDate: taskDB.completionDate,
      createdAt: taskDB.createdAt,
      updatedAt: taskDB.updatedAt,
    };
  }
}

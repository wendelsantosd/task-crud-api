import { Task } from '@modules/task/domain/model/task.aggregate';
import {
  ITaskRepository,
  Tasks,
} from '@modules/task/domain/model/task.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { Result } from 'types-ddd';
import { AdapterTaskDBOToDomain } from '../adapters/task.adapter';
import { TaskDBO } from './task.dbo';
export class TaskRepository implements ITaskRepository {
  constructor(private readonly orm: PrismaService) {}

  public async save(task: Task): Promise<Result<Task>> {
    try {
      const adapterTask = new AdapterTaskDBOToDomain();

      const data: TaskDBO = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        completionDate: task.completionDate,
      };

      const taskDB = await this.orm.tasks.upsert({
        create: data,
        update: data,
        where: { id: task.id.value() },
      });

      const preparedTask = adapterTask.prepare(taskDB);
      const buildedTask = adapterTask.build(preparedTask);

      return Result.Ok(buildedTask.value());
    } catch (error) {
      return Result.fail(
        `Houve um erro ao ${task.id.value() ? 'alterar' : 'adicionar'} a tarefa: ${error.message}`,
      );
    }
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

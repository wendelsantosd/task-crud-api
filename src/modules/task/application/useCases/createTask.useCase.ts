import { Task } from '@modules/task/domain/model/task.aggregate';
import { ITaskRepository } from '@modules/task/domain/model/task.repository';
import { AdapterTaskDBOToDomain } from '@modules/task/infra/adapters/task.adapter';
import { CreateTaskDTO } from '@modules/task/infra/api/dtos/createTask.dto';
import { IUseCase, Result } from 'types-ddd';

type Request = CreateTaskDTO;

type Response = Task;

export class CreateTaskUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly TaskRepository: ITaskRepository) {}

  public async execute(data: Request): Promise<Result<Response>> {
    const toAdapt = new AdapterTaskDBOToDomain().build({
      ...data,
      status: 'Não concluído',
      completionDate: new Date(data.completionDate),
    });

    if (toAdapt.isFail()) return Result.fail(toAdapt.error());

    const Task = await this.TaskRepository.save(toAdapt.value());

    if (Task.isFail()) return Result.fail(Task.error());

    return Result.Ok(Task.value());
  }
}

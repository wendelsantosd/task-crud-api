import { Task } from '@modules/task/domain/model/task.aggregate';
import { ITaskRepository } from '@modules/task/domain/model/task.repository';
import { UpdateTaskDTO } from '@modules/task/infra/api/dtos/updateTask.dto';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  data: UpdateTaskDTO;
  id: string;
};

type Response = Task;

export class UpdateTaskUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute({ id, data }: Request): Promise<Result<Response>> {
    const task = await this.taskRepository.getById(id);

    if (task.isFail()) return Result.fail(task.error());

    const update = task
      .value()
      .update({ ...data, completionDate: new Date(data.completionDate) });

    if (update.isFail()) return Result.fail(update.error());

    const save = await this.taskRepository.save(task.value());

    if (save.isFail()) return Result.fail(save.error());

    return Result.Ok(save.value());
  }
}

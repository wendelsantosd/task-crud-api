import { ITaskRepository } from '@modules/task/domain/model/task.repository';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  id: string;
  status: string;
};

type Response = string;

export class StatusTaskUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute({ id, status }: Request): Promise<Result<Response>> {
    const task = await this.taskRepository.getById(id);

    if (task.isFail()) return Result.fail(task.error());

    const update = task.value().changeDone(status);

    if (update.isFail()) return Result.fail(update.error());

    const save = await this.taskRepository.save(task.value());

    if (save.isFail()) return Result.fail(save.error());

    return Result.Ok(`Status da tarefa mudado para ${status}.`);
  }
}

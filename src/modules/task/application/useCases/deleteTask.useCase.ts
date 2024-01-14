import { ITaskRepository } from '@modules/task/domain/model/task.repository';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  id: string;
};

type Response = string;

export class DeleteTaskUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute({ id }: Request): Promise<Result<Response>> {
    const task = await this.taskRepository.getById(id);

    if (task.isFail()) return Result.fail(task.error());

    const message = await this.taskRepository.delete(id);

    if (message.isFail()) return Result.fail(message.error());

    return Result.Ok(message.value());
  }
}

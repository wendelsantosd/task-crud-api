import { Task } from '@modules/task/domain/model/task.aggregate';
import { ITaskRepository } from '@modules/task/domain/model/task.repository';
import { IUseCase, Result } from 'types-ddd';

type Request = {
  id: string;
};

type Response = Task;

export class GetTaskByIdUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute({ id }: Request): Promise<Result<Task>> {
    const task = await this.taskRepository.getById(id);

    if (task.isFail()) return Result.fail(task.error());

    return Result.Ok(task.value());
  }
}

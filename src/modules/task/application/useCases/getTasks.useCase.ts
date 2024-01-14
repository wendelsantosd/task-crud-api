import {
  ITaskRepository,
  Tasks,
} from '@modules/task/domain/model/task.repository';
import { IUseCase, Result } from 'types-ddd';

type Request = void;

type Response = Tasks;

export class GetTasksUseCase implements IUseCase<Request, Result<Response>> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  public async execute(): Promise<Result<Response>> {
    const tasks = await this.taskRepository.getAll();

    if (tasks.isFail()) return Result.fail(tasks.error());

    return Result.Ok(tasks.value());
  }
}

import { TaskRepository } from '@modules/task/infra/repository/task.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { GetTasksUseCase } from '../useCases/getTasks.useCase';

export const makeGetTasks = (): GetTasksUseCase =>
  new GetTasksUseCase(new TaskRepository(new PrismaService()));

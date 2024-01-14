import { TaskRepository } from '@modules/task/infra/repository/task.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { DeleteTaskUseCase } from '../useCases/deleteTask.useCase';

export const makeDeleteTask = (): DeleteTaskUseCase =>
  new DeleteTaskUseCase(new TaskRepository(new PrismaService()));

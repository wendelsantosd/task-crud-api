import { TaskRepository } from '@modules/task/infra/repository/task.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { UpdateTaskUseCase } from '../useCases/updateTask.useCase';

export const makeUpdateTask = (): UpdateTaskUseCase =>
  new UpdateTaskUseCase(new TaskRepository(new PrismaService()));

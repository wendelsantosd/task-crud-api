import { TaskRepository } from '@modules/task/infra/repository/task.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { CreateTaskUseCase } from '../useCases/createTask.useCase';

export const makeCreateTask = (): CreateTaskUseCase =>
  new CreateTaskUseCase(new TaskRepository(new PrismaService()));

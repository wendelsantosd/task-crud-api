import { TaskRepository } from '@modules/task/infra/repository/task.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { GetTaskByIdUseCase } from '../useCases/getTaskById.useCase';

export const makeGetTaskById = (): GetTaskByIdUseCase =>
  new GetTaskByIdUseCase(new TaskRepository(new PrismaService()));

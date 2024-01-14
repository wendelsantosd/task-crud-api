import { TaskRepository } from '@modules/task/infra/repository/task.repository';
import { PrismaService } from '@shared/infra/db/prisma.service';
import { StatusTaskUseCase } from '../useCases/statusTask.useCase';

export const makeStatusTask = (): StatusTaskUseCase =>
  new StatusTaskUseCase(new TaskRepository(new PrismaService()));

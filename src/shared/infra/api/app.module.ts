import { TaskModule } from '@modules/task/infra/api/task.module';
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';

@Global()
@Module({
  imports: [TaskModule, PrismaModule],
  providers: [PrismaModule],
  exports: [PrismaModule],
})
export class AppModule {}

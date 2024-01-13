import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaModule],
  exports: [PrismaModule],
})
export class AppModule {}

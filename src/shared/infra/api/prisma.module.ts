import { Module } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '../db/prisma.service';

const prismaService = new PrismaService();

const PrismaProvider = {
  provide: PrismaService,
  useFactory: () => prismaService,
  inject: [REQUEST],
};

@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class PrismaModule {}

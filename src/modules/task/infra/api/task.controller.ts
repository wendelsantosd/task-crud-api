import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async CreateTask(@Body() data: CreateTaskDTO, @Res() response: Response) {
    const result = await this.taskService.create(data);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({
      message: 'Tarefa criada com sucesso',
    });
  }
}

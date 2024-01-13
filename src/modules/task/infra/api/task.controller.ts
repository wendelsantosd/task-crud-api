import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskPresenter, TasksPresenter } from '../presenters/task.presenter';
import { CreateTaskDTO } from './dtos/createTask.dto';
import { UpdateTaskDTO } from './dtos/updateTask.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(@Res() response: Response) {
    const result = await this.taskService.getAll();

    if (result.isFail())
      return response.status(HttpStatus.NOT_FOUND).json({
        message: result.error(),
      });

    return response
      .status(HttpStatus.OK)
      .json(new TasksPresenter().toPresenter(result.value()));
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string, @Res() response: Response) {
    const result = await this.taskService.findById(id);

    if (result.isFail())
      return response.status(HttpStatus.NOT_FOUND).json({
        message: result.error(),
      });

    return response
      .status(HttpStatus.OK)
      .json(new TaskPresenter().toPresenter(result.value()));
  }

  @Post()
  async CreateTask(@Body() data: CreateTaskDTO, @Res() response: Response) {
    const result = await this.taskService.create(data);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({
      message: 'Tarefa criada com sucesso.',
    });
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() data: UpdateTaskDTO,
    @Res() response: Response,
  ) {
    const result = await this.taskService.update(data, id);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({
      message: 'Tarefa alterada com sucesso.',
    });
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string, @Res() response: Response) {
    const result = await this.taskService.delete(id);

    if (result.isFail())
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.error(),
      });

    return response.status(HttpStatus.OK).json({
      message: result.value(),
    });
  }
}

// src/task/task.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() body: CreateTaskDTO): Promise<{id: number}> {
    const id = await this.taskService.save(body);
    return { id, ...body};
  }
}

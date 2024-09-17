// src/task/task.controller.ts

import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';
import { takeLast } from 'rxjs';

@Controller('/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() body: TaskDTO): Promise<{id: number}> {
    const id = await this.taskService.save(body);
    return { id, ...body};
  }

  @Get()
  async findAllTasks(): Promise<TaskDTO[]> {
    const tasks = this.taskService.findAll();
    return tasks;
  }

  @Get(':id')
  async findTaskById(@Param('id') id: number): Promise<TaskDTO> {
    const task = this.taskService.findById(id);
    return task;
  }

  @Get('/getTasksByUser/:userId')
  async findTasksByUser(@Param('userId') userId: number): Promise<TaskDTO[]> {
    const tasks = this.taskService.findTasksByUser(userId);
    return tasks;
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() body: TaskDTO): Promise<TaskDTO> {
    const task = this.taskService.update(id, body);
    return task;
  }
}

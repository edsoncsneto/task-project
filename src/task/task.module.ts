import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './repository/task.respository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository]
})
export class TaskModule {}

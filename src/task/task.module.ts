import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './repository/task.respository';
import { AppUserRepository } from 'src/usuario/repository/app-user.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, AppUserRepository]
})
export class TaskModule {}

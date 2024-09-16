import { Module } from '@nestjs/common';
import { AppUserModule } from './usuario/app-user.module';
import { ActivityModule } from './activity/activity.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AppUserModule, ActivityModule, TaskModule]
})
export class AppModule {}

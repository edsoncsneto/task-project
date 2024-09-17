// src/task/dto/create-task.dto.ts

import { IsNotEmpty, IsNumber, IsOptional, IsDate, IsEnum } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum'; // Importar o enum Status se estiver em um arquivo separado

export class TaskDTO {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  id_app_user: number;

  @IsNotEmpty()
  @IsNumber()
  id_activity: number;

  @IsOptional()
  @IsDate()
  start_date?: Date;

  @IsOptional()
  @IsDate()
  end_date?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}


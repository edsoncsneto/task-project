import { Injectable } from '@nestjs/common';
import { TaskRepository } from './repository/task.respository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './enum/task-status.enum';

@Injectable()
export class TaskService {
    constructor(
        private readonly taskRepository: TaskRepository
    ) {}

    async save(task: CreateTaskDTO): Promise<number> {
        task.start_date = new Date();
        task.status = TaskStatus.TODO;
        try {
            const id = await this.taskRepository.save(task);
            return id;
        } catch (e) {
            console.log("Erro de serviço: " + e.message);
        }
    }
}

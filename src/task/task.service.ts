import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './repository/task.respository';
import { TaskDTO } from './dto/task.dto';
import { TaskStatus } from './enum/task-status.enum';
import { AppUserRepository } from 'src/usuario/repository/app-user.repository';

@Injectable()
export class TaskService {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly appUserRepository: AppUserRepository
    ) {}

    async save(task: TaskDTO): Promise<number> {
        task.start_date = new Date();
        task.status = TaskStatus.TODO;
        try {
            const id = await this.taskRepository.save(task);
            return id;
        } catch (e) {
            console.log("Erro de serviço: " + e.message);
        }
    }

    async findAll(): Promise<TaskDTO[]> {
        try{
            const tasks = await this.taskRepository.findAll();
            return tasks;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async findById(id: number): Promise<TaskDTO> {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundException('Registro nao encontrado');
        }
        try {
            return task;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async findTasksByUser(id: number): Promise<TaskDTO[]> {
        const user = this.appUserRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        try {
            const result = this.taskRepository.findTasksByUser(id);
            return result;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async update(id: number, taskDto: TaskDTO): Promise<TaskDTO> {
        const task = this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundException('Registro não encontrado para atualização');
        }
        try {
            const task = await this.taskRepository.update(id, taskDto);
            return task;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }
}

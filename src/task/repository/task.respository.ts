import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { TaskDTO } from "../dto/task.dto";
import { connection } from "../../../config/sql";

@Injectable()
export class TaskRepository {
    private readonly dataBase: Knex;

    constructor() {
        this.dataBase = connection;
    }

    async save(task: TaskDTO): Promise<number> {
        try {
            const result = await this.dataBase("task")
                .insert(task)
                .returning('id');
            return result[0].id;
        } catch (err) {
            throw new Error('Erro no repositório: ' + err.message);
        }
    }

    async findAll(): Promise<TaskDTO[]> {
        try {
            const result = await this.dataBase('task')
            .select('*');

            return result;
        } catch (e) {
            throw new Error('Erro no repositório: ' + e.message);
        }
    }

    async findById(id: number): Promise<TaskDTO> {
         try {
            const result = await this.dataBase('task')
            .select('*')
            .where('id', id);
            return result[0];
         } catch (e) {
            throw new Error('Erro no respositório: ' + e.message);
         }
    }

    async update(id: number, taskDto: TaskDTO): Promise<TaskDTO> {
        try {
            const result = await this.dataBase('task')
            .where({id})
            .update(taskDto)
            .returning('*');
            return result[0];
        } catch (e) {
            throw new Error('Erro no respositório: ' + e.message);
        }
    }

    async findTasksByUser(id: number): Promise<TaskDTO[]> {
        try{
            const result = await this.dataBase('task')
            .select('*')
            .where('id_app_user', id);
            return result;
        } catch (e) {
            throw new Error('Erro no respositório: ' + e.message);
        }
    }

}
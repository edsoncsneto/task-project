import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { CreateTaskDTO } from "../dto/create-task.dto";
import { connection } from "../../../config/sql";

@Injectable()
export class TaskRepository {
    private readonly dataBase: Knex;

    constructor() {
        this.dataBase = connection;
    }

    async save(task: CreateTaskDTO): Promise<number> {
        try {
            const result = await this.dataBase("task")
                .insert(task)
                .returning('id');
            return result[0].id;
        } catch (err) {
            throw new Error('Erro no repositório: ' + err.message);
        }
    }
}
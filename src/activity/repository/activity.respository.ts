import { Injectable } from "@nestjs/common";
import { connection } from "config/sql";
import { Knex } from "knex";
import { CreateActivityDTO } from "../dto/create-activity.dto";

@Injectable()
export class ActivityRepository {
    private readonly dataBase: Knex;

    constructor() {
        this.dataBase = connection;
    }

    async create(activity: CreateActivityDTO): Promise<number> {
        try {
            const result = await this.dataBase("activity")
            .insert(activity)
            .returning('id');
            return result[0].id;

        } catch (err) {
            throw new Error('Erro no respositório: ' + err.message);
        }
    }

}
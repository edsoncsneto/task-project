import { Injectable } from "@nestjs/common";
import { connection } from "config/sql";
import { Knex } from "knex";
import { CreateActivityDTO, ListActivityDTO, UpdateActivityDTO } from "../dto/create-activity.dto";

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

    async findAll(): Promise<ListActivityDTO[]> {
        try{
            const result = await this.dataBase('activity')
            .select('*');

            return result;
        } catch (e) {
            throw new Error('Erro no repositório: '+ e.message);
        }
    }

    async findById(id: number): Promise<ListActivityDTO> {
        try{
            const result = await this.dataBase('activity')
            .select('*')
            .where('id', id);
            
            return result[0];
        } catch (e) {
            throw new Error('Erro no repositório: '+ e.message);
        }
    }

    async update(id: number, activity: UpdateActivityDTO): Promise<UpdateActivityDTO> {
        const originalActivity = this.dataBase('activity')
        .select('name')
        .where('id', id);

        if(!originalActivity) {
            throw new Error("Atividade não encontrada");
        }
        
        try{
            const result = await this.dataBase('activity')
            .where({ id })
            .update(activity)
            .returning('*');
            return result[0];
        } catch (e) {
            throw new Error(e.message);
        }
    }

}
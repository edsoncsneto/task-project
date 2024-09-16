import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { CreateAppUserDTO } from "../dto/create-app-user.dto";
import { connection } from "../../../config/sql";

@Injectable()
export class AppUserRepository {
    private readonly dataBase: Knex;

    constructor() {
        this.dataBase = connection;
    }

    async save(appUser: CreateAppUserDTO): Promise<number> {
        try {
            const result = await this.dataBase("app_users")
                .insert(appUser)
                .returning('id');
            return result[0].id;
        } catch (err) {
            throw new Error('Erro no repositório: ' + err.message);
        }
    }
}
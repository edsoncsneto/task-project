import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { CreateAppUserDTO } from "../dto/create-app-user.dto";
import { error } from "console";

@Injectable()
export class AppUserRepository {
    private readonly dataBase: Knex;

    constructor() {
        this.dataBase = require('../../../config/sql');
    }

    async create(app_user: CreateAppUserDTO): Promise<number> {
        const [id] = await this.dataBase("app_user")
        .insert(app_user)
        .catch(() => {
            throw new error({
                message: 'Erro de repository'
            });
        });
        return id;
    }
}
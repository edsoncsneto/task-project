import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { CreateAppUserDTO, ListAppUserDTO, UpdateAppUserDTO } from "../dto/app-user.dto";
import { connection } from "../../../config/sql";

@Injectable()
export class AppUserRepository {
    private readonly dataBase: Knex;

    constructor() {
        this.dataBase = connection;
    }

    async save(appUser: CreateAppUserDTO): Promise<ListAppUserDTO> {
        try {
            const result = await this.dataBase("app_user")
                .insert(appUser)
                .returning('*');
            return result[0].id;
        } catch (e) {
            throw new Error('Erro no repositório: ' + e.message);
        }
    }

    async findAll(): Promise<ListAppUserDTO[]> {
        try {
            const result = await this.dataBase('app_user')
            .select('id', 'name', 'email');

            return result;
        } catch (e) {
            throw new Error('Erro no repositório: ' + e.message);
        }
    }

    async findById(id: number): Promise<ListAppUserDTO> {
        try {
            const result = await this.dataBase('app_user')
            .select('id', 'name', 'email')
            .where('id', id);

            return result[0];
        } catch (e) {
            throw new Error('Erro no respositório: ' + e.message);
        }
    }

    async findByEmail(email: string): Promise<ListAppUserDTO> {
        try {
            const result = await this.dataBase('app_user')
            .from('app_user')
            .where('email', email);

            return result[0];
        } catch (e) {
            throw new Error('Erro no respositório: ' + e.message);
        }
    }

    async update(id: number, updateAppUserDto: UpdateAppUserDTO): Promise<UpdateAppUserDTO> {
        try {
            const result = await this.dataBase('app_user')
            .where({ id })
            .update(updateAppUserDto)
            .returning('*');
            return result[0];
        } catch (e) {
            throw new Error('Erro no respositório: ' + e.message);
        }
    }
}
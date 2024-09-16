import { Injectable } from "@nestjs/common";
import { AppUserRepository } from "./repository/app-user.repository";
import { CreateAppUserDTO } from "./dto/create-app-user.dto";
import { hash } from 'bcrypt';
import { randomInt } from 'node:crypto';

@Injectable()
export class AppUserService {
    constructor(
        private readonly appUserRepository: AppUserRepository
    ) {}

    async save(appUser: CreateAppUserDTO): Promise<number> {
        
        const randomSalt = randomInt(10, 16);
        const passwordHash = await hash(appUser.password, randomSalt);
        appUser.password = passwordHash;

        try{
            const id = await this.appUserRepository.save(appUser);
            return id;
        } catch (e) {
            console.log("Erro de serviço: " + e.message);
        }
        
    }

}
import { Injectable } from "@nestjs/common";
import { AppUserRepository } from "./repository/app-user.repository";
import { CreateAppUserDTO } from "./dto/create-app-user.dto";

@Injectable()
export class AppUserService {
    constructor(
        private readonly appUserRepository: AppUserRepository
    ) {}

    async save(appUser: CreateAppUserDTO) {
        //regra de negocio
        try{
            this.appUserRepository.create(appUser);
        } catch (e) {
            console.log(e.message);
        }
        
    }

}
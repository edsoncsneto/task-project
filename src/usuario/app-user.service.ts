import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AppUserRepository } from "./repository/app-user.repository";
import { CreateAppUserDTO, ListAppUserDTO, UpdateAppUserDTO } from "./dto/app-user.dto";
import { LoginAppUserDTO } from "src/auth/dto/auth.dto"; 
import * as bcrypt from 'bcrypt';
import { randomInt } from 'node:crypto';

@Injectable()
export class AppUserService {
    constructor(
        private readonly appUserRepository: AppUserRepository
    ) {}

    async generatePassword(password: string): Promise<string> {
        const randomSalt = randomInt(10, 16);
        const passwordHash = await bcrypt.hash(password, randomSalt);
        return passwordHash;
    }

    async save(appUser: CreateAppUserDTO): Promise<number> {
        appUser.password = await this.generatePassword(appUser.password);

        try{
            const id = await this.appUserRepository.save(appUser);
            return id;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
        
    }

    async findAll(): Promise<ListAppUserDTO[]> {
        try {
            const users = await this.appUserRepository.findAll();
            return users;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async findById(id: number): Promise<ListAppUserDTO> {
        const user = await this.appUserRepository.findById(id);
        if (!user){
            throw new NotFoundException('Registro nao encontrado');
        }
        try {
            return user;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async update(id: number, updateAppUserDto: UpdateAppUserDTO): Promise<UpdateAppUserDTO> {
        const user = this.appUserRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Registro não encontrado para atualização');
        }
        updateAppUserDto.password = await this.generatePassword(updateAppUserDto.password);
        try {
            const user = await this.appUserRepository.update(id, updateAppUserDto);
            return user;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

}
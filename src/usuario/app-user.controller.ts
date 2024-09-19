import { Controller, Injectable, Post, Body, Get, Param, Put } from "@nestjs/common";
import { AppUserService } from "./app-user.service";
import { CreateAppUserDTO, ListAppUserDTO, UpdateAppUserDTO } from "./dto/app-user.dto";

@Controller('/appuser')
@Injectable()
export class AppUserController {
    constructor(
        private readonly appUserService: AppUserService
    ){}

    @Post()
    async saveAppUser(@Body() body: CreateAppUserDTO): Promise<ListAppUserDTO> {
        const user = await this.appUserService.save(body);
        return user;
    }

    @Get()
    async findAllUsers(): Promise<ListAppUserDTO[]> {
        const users = this.appUserService.findAll();
        return users;
    }

    @Get(':id')
    async findUserById(@Param('id') id: number): Promise<ListAppUserDTO> {
        const user = this.appUserService.findById(id);
        return user;
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() body: UpdateAppUserDTO): Promise<UpdateAppUserDTO> {
        const user = this.appUserService.update(id, body);
        return user;
    }
}
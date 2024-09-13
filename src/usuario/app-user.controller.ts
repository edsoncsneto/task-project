import { Controller, Injectable, Post, Body } from "@nestjs/common";
import { AppUserService } from "./app-user.service";
import { CreateAppUserDTO } from "./dto/create-app-user.dto";

@Controller('/appuser')
@Injectable()
export class AppUserController {
    constructor(
        private readonly appUserService: AppUserService
    ){}

    @Post()
    async saveAppUser(@Body() body: CreateAppUserDTO): Promise<CreateAppUserDTO> {
        const id = await this.appUserService.save(body);
        return { id, ...body};
    }
}
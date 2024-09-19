import { Body, Controller, Post } from "@nestjs/common";
import { AppUserService } from "../usuario/app-user.service";
import { CreateAuthDTO, LoginAuthDTO } from "../auth/dto/auth.dto";
import { AuthService } from "./auth.service";
import { CreateAppUserDTO } from "src/usuario/dto/app-user.dto";

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly appUserService: AppUserService
    ) {}

    @Post('login')
    async login(@Body() body: LoginAuthDTO) {
        const user = await this.authService.validateUser(body);

        // Gerar o token JWT
        const token = await this.authService.generateToken(user);

        // Retornar o token
        return { token };
    }

    @Post('create')
    async create(@Body() body: CreateAppUserDTO) {
        const newUser = await this.appUserService.save(body);
        const token = await this.authService.generateToken(newUser);
        return {token};
    }

    @Post('validate')
    async validateToken(@Body() body: any) {
        return this.authService.readToken(body.token);
    }
}
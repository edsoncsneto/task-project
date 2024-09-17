import { Body, Controller, Post } from "@nestjs/common";
import { AppUserService } from "../usuario/app-user.service";
import { LoginAppUserDTO } from "../auth/dto/auth.dto";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: LoginAppUserDTO) {
        const user = await this.authService.validateUser(body);

        // Gerar o token JWT
        const token = await this.authService.generateToken(user);

        // Retornar o token
        return { token };
    }
}
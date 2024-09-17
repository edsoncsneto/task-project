import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AppUserRepository } from "src/usuario/repository/app-user.repository";

@Module({
    providers: [AuthService, AppUserRepository],
    controllers: [AuthController]
})

export class AuthModule{}
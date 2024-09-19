import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AppUserRepository } from "src/usuario/repository/app-user.repository";
import { AppUserService } from "src/usuario/app-user.service";

@Module({
    providers: [AuthService, AppUserRepository, AppUserService],
    controllers: [AuthController]
})

export class AuthModule{}
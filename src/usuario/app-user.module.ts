import { Module } from '@nestjs/common';
import { AppUserService } from "./app-user.service";
import { AppUserController } from "./app-user.controller";
import { AppUserRepository } from './repository/app-user.repository';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
    providers: [AppUserService, AppUserRepository, AuthService],
    controllers: [AppUserController, AuthController]
})

export class AppUserModule {}
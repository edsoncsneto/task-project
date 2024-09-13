import { Module } from '@nestjs/common';
import { AppUserService } from "./app-user.service";
import { AppUserController } from "./app-user.controller";
import { AppUserRepository } from './repository/app-user.repository';

@Module({
    providers: [AppUserService, AppUserRepository],
    controllers: [AppUserController]
})

export class AppUserModule {}
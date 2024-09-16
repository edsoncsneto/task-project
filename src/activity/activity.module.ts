import { Module } from "@nestjs/common";
import { ActivityRepository } from "./repository/activity.respository";
import { ActivityService } from "./activity.service";
import { ActivityController } from "./activity.controller";

@Module({
    providers: [ActivityRepository, ActivityService],
    controllers: [ActivityController]
})

export class ActivityModule {}
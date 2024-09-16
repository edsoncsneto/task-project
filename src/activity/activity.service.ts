import { Injectable } from "@nestjs/common";
import { ActivityRepository } from "./repository/activity.respository";
import { CreateActivityDTO } from "./dto/create-activity.dto";

@Injectable()
export class ActivityService {
    constructor(
        private readonly activityRepository: ActivityRepository
    ) {}

    async save(activity: CreateActivityDTO): Promise<number> {
        try {
            const id = await this.activityRepository.create(activity);
            return id;
        } catch (e) {
            console.log("Erro de serviço: " + e.message);
        }
    }
}
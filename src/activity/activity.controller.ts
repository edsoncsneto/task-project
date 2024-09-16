import { Controller, Injectable, Post, Body } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { CreateActivityDTO } from "./dto/create-activity.dto";

@Controller('/activity')
@Injectable()
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService
    ) {}

    @Post()
    async saveActivity(@Body() body: CreateActivityDTO): Promise<{ id: number, name: string, description: string}> {
        const id = await this.activityService.save(body);
        return { id, ...body};
    }
}
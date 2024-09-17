import { Controller, Injectable, Post, Body, Get, Param, Put } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { CreateActivityDTO, ListActivityDTO, UpdateActivityDTO } from "./dto/create-activity.dto";

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

    @Get()
    async findAllActivities(): Promise<ListActivityDTO[]> {
        const activities = this.activityService.findAll();
        return activities;
    }

    @Get(':id')
    async findActivityById(@Param('id') id: number): Promise<ListActivityDTO> {
        const acitivity = this.activityService.findById(id);
        return acitivity;
    }

    @Put(':id')
    async updateActivity(@Param('id') id: number, @Body() body: UpdateActivityDTO): Promise<UpdateActivityDTO> {
        const activity = this.activityService.update(id, body);
        return activity;
    }
}
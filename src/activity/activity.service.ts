import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ActivityRepository } from "./repository/activity.respository";
import { CreateActivityDTO, ListActivityDTO, UpdateActivityDTO } from "./dto/create-activity.dto";
import { NotFoundError } from "rxjs";

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

    async findAll(): Promise<ListActivityDTO[]> {
        try {
            const activities = await this.activityRepository.findAll();
            return activities;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async findById(id: number): Promise<ListActivityDTO> {
        const activity = await this.activityRepository.findById(id);
        if (!activity) {
            throw new NotFoundException('Registro nao encontrado');
        }
        try{
            return activity;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async update(id: number, activityDto: UpdateActivityDTO): Promise<UpdateActivityDTO> {
        try {
            const activity = await this.activityRepository.update(id, activityDto);
            return activity;
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }
}
export class CreateActivityDTO {
    name: string;
    description: string;
}

export class ListActivityDTO {
    id: number;
    name: string;
    description: string;
}

export class UpdateActivityDTO {
    id?: number;
    name: string;
    description: string;
}
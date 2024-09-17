export class CreateAppUserDTO {
    name: string;
    email: string;
    password: string
}

export class ListAppUserDTO {
    id: number;
    name: string;
    email: string;
    password?: string
}

export class UpdateAppUserDTO {
    id?: number;
    name: string;
    email: string;
    password: string
}
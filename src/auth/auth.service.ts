import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AppUserRepository } from "src/usuario/repository/app-user.repository";
import { LoginAuthDTO } from "./dto/auth.dto";
import { ListAppUserDTO } from "src/usuario/dto/app-user.dto";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private readonly appUserRepository: AppUserRepository
    ) {}

    async validateUser(loginAppUserDto: LoginAuthDTO): Promise<ListAppUserDTO> {
        const user = await this.appUserRepository.findByEmail(loginAppUserDto.email);

        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado');
        }
        const isMatch = await bcrypt.compare(loginAppUserDto.password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Credenciais incorretas.');
        }

        return user;
    }

    async generateToken(user: ListAppUserDTO): Promise<string> {
        const payload = { email: user.email, sub: user.id };
        return jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }); // Substitua 'your_jwt_secret' pela sua chave secreta
    }

    auth = (token) => {
        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            return decoded;
        } catch (err) {
            throw new UnauthorizedException('Token inválido');
        }
    }

    readToken(token) {
        if (!token) {
            throw new BadRequestException('Nenhum token foi encontrado');
        }
        return this.auth(token);
    }

}
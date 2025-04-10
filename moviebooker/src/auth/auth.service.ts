import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Email ou mot de passe invalide');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou mot de passe invalide');
        }

        const { ...result } = user;

        return result;
    }

    async login(user: any): Promise<{ access_token: string }> {
        if (!user?.email || !user?.id) {
            throw new BadRequestException('Données de connexion invalides');
        }

        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(email: string, password: string): Promise<{ message: string }> {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException("Email déjà utilisée");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.userService.create({ email, password: hashedPassword });

        return {
            message: 'Compte créé avec succès',
        };
    }
}
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

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const { ...result } = user;

        return result;
    }

    async login(user: any): Promise<{ access_token: string }> {
        if (!user?.username || !user?.id) {
            throw new BadRequestException('Invalid user data');
        }

        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, password: string): Promise<{ message: string }> {
        const existingUser = await this.userService.findByUsername(username);
        if (existingUser) {
            throw new BadRequestException('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.userService.create({ username, password: hashedPassword });

        return {
            message: 'User registered successfully',
        };
    }
}
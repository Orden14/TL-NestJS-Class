import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiBody({ type: RegisterDto })
    async register(@Body() registerDto: RegisterDto): Promise<{ message: string }> {
        return this.authService.register(registerDto.username, registerDto.password);
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password,
        );

        if (!user) {
            throw new Error('Invalid credentials');
        }

        return this.authService.login(user);
    }
}

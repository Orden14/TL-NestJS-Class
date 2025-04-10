import {IsString, MinLength, MaxLength, IsEmail} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ description: "email", example: 'patrick@gmail.com' })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Mot de passe', example: 'pass123' })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

export class LoginDto {
    @ApiProperty({ description: "email", example: 'patrick@gmail.com' })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Mot de passe', example: 'pass123' })
    @IsString()
    password: string;
}

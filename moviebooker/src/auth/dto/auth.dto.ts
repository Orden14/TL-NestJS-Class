import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ description: "Nom d'utilisateur", example: 'Patrick' })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty({ description: 'Mot de passe', example: 'pass123' })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

export class LoginDto {
    @ApiProperty({ description: "Nom d'utilisateur", example: 'Patrick' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'Mot de passe', example: 'pass123' })
    @IsString()
    password: string;
}

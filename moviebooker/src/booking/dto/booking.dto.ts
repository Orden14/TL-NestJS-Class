import { ApiProperty } from '@nestjs/swagger';
import {IsDate, IsNotEmpty, IsNumber} from "class-validator";

export class BookingDto {
    @ApiProperty({ description: 'ID du film' })
    @IsNotEmpty()
    @IsNumber()
    movieId: number;

    @ApiProperty({ description: 'Date de la réservation' })
    @IsNotEmpty()
    @IsDate()
    bookingDate: string;
}

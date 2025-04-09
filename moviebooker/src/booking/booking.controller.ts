import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import {BookingDto} from "./dto/booking.dto";
import {Booking} from "./booking.entity";
import {UserService} from "../user/user.service";

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
        private readonly userService: UserService,
    ) {}

    @ApiOperation({ summary: 'Créer une nouvelle réservation' })
    @ApiBody({ type: BookingDto })
    @UseGuards(JwtAuthGuard)
    @Post()
    async createBooking(@Body() bookingDto: BookingDto, @Request() req): Promise<Booking> {
        const authenticatedUser = await this.userService.getUserFromRequest(req);

        return this.bookingService.createBooking(bookingDto, authenticatedUser);
    }

    @ApiOperation({ summary: 'Fetch booking list' })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserBookings(@Request() req): Promise<Booking[]> {
        return this.bookingService.getUserBookings(req.user);
    }

    @ApiOperation({ summary: 'Cancel a booking' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async cancelBooking(@Request() req, @Param('id') id: number): Promise<{ message: string }> {
        const authenticatedUser = await this.userService.getUserFromRequest(req);

        return this.bookingService.cancelBooking(id, authenticatedUser);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { User } from '../user/user.entity';
import {BookingDto} from "./dto/booking.dto";

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {}

    async createBooking(bookingDto: BookingDto, user: User): Promise<Booking> {
        const { movieId, bookingDate } = bookingDto;
        const booking = this.bookingRepository.create({ user, movieId, bookingDate });

        return this.bookingRepository.save(booking);
    }

    async getUserBookings(user: User): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { id: user.id } });
    }

    async cancelBooking(bookingId: number, user: User): Promise<{ message: string }> {
        const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });

        if (booking?.user.id !== user.id) {
            throw new Error('You can only cancel your own bookings');
        }

        if (booking) {
            await this.bookingRepository.remove(booking);
        }

        return {
            message: 'Booking cancelled successfully',
        };
    }
}

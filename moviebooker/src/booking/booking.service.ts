import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Between, Repository} from 'typeorm';
import {Booking} from './booking.entity';
import {User} from '../user/user.entity';
import {BookingDto} from "./dto/booking.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class BookingService {
    private readonly apiKey: string | undefined;

    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        private readonly configService: ConfigService,
    ) {
        this.apiKey = this.configService.get<string>('API_KEY');
    }

    async createBooking(bookingDto: BookingDto, user: { id: number }): Promise<Booking> {
        const { movieId, bookingDate } = bookingDto;

        const bookingDateTime = new Date(bookingDate);

        if (isNaN(bookingDateTime.getTime())) {
            throw new BadRequestException('La date de réservation est invalide.');
        }

        const startOfDay = new Date(bookingDateTime);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(bookingDateTime);
        endOfDay.setHours(23, 59, 59, 999);

        const existingBookings = await this.bookingRepository.find({
            where: {
                user: { id: user.id },
                bookingDate: Between(startOfDay, endOfDay),
            },
        });

        for (const existingBooking of existingBookings) {
            const existingBookingTime = existingBooking.bookingDate.getTime();
            const bookingTime = bookingDateTime.getTime();

            const timeDifference = Math.abs(bookingTime - existingBookingTime) / (1000 * 60 * 60);

            if (timeDifference < 2) {
                throw new BadRequestException("Il doit y avoir au moins 2 heures d'écart entre deux réservations.");
            }
        }

        const booking = this.bookingRepository.create({ user, movieId, bookingDate: bookingDateTime });
        return this.bookingRepository.save(booking);
    }

    async getUserBookings(user: User): Promise<any[]> {
        const bookings = await this.bookingRepository.find({ where: { user: { id: user.id } } });

        return await Promise.all(
            bookings.map(async (booking) => {
                const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${booking.movieId}`, {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                });

                if (!movieResponse.ok) {
                    throw new Error('Failed to fetch movie data');
                }

                const movieData = await movieResponse.json();

                return {
                    id: booking.id,
                    bookingDate: booking.bookingDate,
                    movie: {
                        id: movieData.id,
                        original_title: movieData.title,
                        release_date: movieData.release_date,
                        backdrop_path: movieData.backdrop_path,
                    },
                };
            }),
        );
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

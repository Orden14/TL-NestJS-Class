import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Booking]),
        UserModule
    ],
    providers: [BookingService],
    controllers: [BookingController],
    exports: [BookingService],
})
export class BookingModule {}

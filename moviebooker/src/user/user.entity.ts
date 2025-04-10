import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from "../booking/booking.entity";
import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];
}
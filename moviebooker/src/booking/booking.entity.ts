import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movieId: number;

    @Column()
    bookingDate: Date;

    @ManyToOne(() => User, (user) => user.bookings, { eager: true })
    user: User;
}

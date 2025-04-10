import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(user: { email: string; password: string }): Promise<User> {
        const newUser = this.userRepository.create(user);

        return this.userRepository.save(newUser);
    }

    async getUserFromRequest(req: any): Promise<User> {
        const userId = req.user.id;

        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('User not authenticated');
        }

        return user;
    }
}
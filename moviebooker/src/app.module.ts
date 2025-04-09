import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigModule } from './config/typeorm.module';
import {ConfigModule} from "@nestjs/config";
import { BookingModule } from './booking/booking.module';
import { MovieModule } from './movie/movie.module';
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env'],
        }),
        HttpModule,
        TypeOrmConfigModule,
        UserModule,
        AuthModule,
        BookingModule,
        MovieModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

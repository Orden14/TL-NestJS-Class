import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigModule } from './config/typeorm.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot(), TypeOrmConfigModule, UserModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

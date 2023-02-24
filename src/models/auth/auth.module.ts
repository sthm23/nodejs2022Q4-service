import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import * as dotenv from 'dotenv';
import { PassportModule } from "@nestjs/passport";
import { JwtAccessStrategy } from "./strategy/accessToken.strategy";
import { JwtRefreshStrategy } from "./strategy/refreshToken.strategy";
import { APP_GUARD } from "@nestjs/core";

dotenv.config();

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: process.env.TOKEN_EXPIRE_TIME 
            },

        }),
    ],
    providers: [
        AuthService, 
        JwtAccessStrategy, 
        JwtRefreshStrategy,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAccessStrategy,
        // },
    ],
    controllers: [AuthController],
    exports: []
})
export class AuthModule {}
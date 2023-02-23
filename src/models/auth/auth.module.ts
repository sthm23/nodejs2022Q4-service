import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { 
        expiresIn: process.env.TOKEN_EXPIRE_TIME 
      },
      
    }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: []
})
export class AuthModule {}
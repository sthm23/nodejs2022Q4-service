import { Body, Controller, HttpCode, HttpStatus, Injectable, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { Response } from 'express';
import { AuthDto, AuthSchema } from "../dto/login.dto";
import { AccessTokenGuard } from "../guard/accessToken.guard";
import { AuthPipe } from "../pipe/authValidate.pipe";
import { AuthRefTokenDto } from "../dto/AuthRefToken.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('login')
    loginPlatform(@Body(new AuthPipe(AuthSchema)) body: AuthDto) {
        return this.authService.login(body);
    }

    @UseGuards(AccessTokenGuard)
    @Post('signup')
    createProfile(@Body(new AuthPipe(AuthSchema)) body: AuthDto) {
        return this.authService.register(body)
    }

    // @UseGuards(AccessTokenGuard)
    @Post('refresh')
    @HttpCode(200)
    refreshToken(@Body(new ValidationPipe()) body: AuthRefTokenDto) {
        return this.authService.refreshToken(body)
    }

}
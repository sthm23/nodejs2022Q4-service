import * as Joi from 'joi';

export interface AuthDto {
    password: string;
    login: number;
}

export const AuthSchema = Joi.object({
    password: Joi.string().required(),
    login: Joi.string().required(),
});
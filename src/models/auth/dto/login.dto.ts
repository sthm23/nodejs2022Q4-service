import * as Joi from 'joi';

export interface AuthDto {
    login: string;
    password: string;
}

export const AuthSchema = Joi.object({
    password: Joi.string().required(),
    login: Joi.string().required(),
});
import * as Joi from 'joi';

export interface CreateUserDto {
  login: string;
  password: string;
}

export const createUserSchema = Joi.object({
  password: Joi.string().required(),
  login: Joi.string().required(),
  version: Joi.number(), // integer number, increments on update
  createdAt: Joi.number(), // timestamp of creation
  updatedAt: Joi.number(),
});

import * as Joi from 'joi';

export interface CreateUserDto {
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number;
}

export const createUserSchema = Joi.object({
  password: Joi.string().required(),
  login: Joi.string().required(),
  version: Joi.number().integer(), // integer number,
  createdAt: Joi.number().integer(), //  increments on update
  updatedAt: Joi.number().integer(), // timestamp of creation
});

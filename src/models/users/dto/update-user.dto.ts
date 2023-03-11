import * as Joi from 'joi';

export interface UpdateUserDTO {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
export const updateUserSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

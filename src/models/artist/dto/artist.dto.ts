import * as Joi from 'joi';

export interface ArtistDto {
  name: string;
  grammy: boolean;
}

export const ArtistSchema = Joi.object({
  name: Joi.string().required(),
  grammy: Joi.boolean().required(),
});

import * as Joi from 'joi';

export interface AlbumsDto {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export const AlbumsSchema = Joi.object({
  name: Joi.string().required(),
  artistId: Joi.string().allow(null).required(),
  year: Joi.number().required(),
});

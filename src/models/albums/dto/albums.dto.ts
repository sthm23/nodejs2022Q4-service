import * as Joi from 'joi';

export interface AlbumsDto {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export const AlbumsSchema = Joi.object({
  name: Joi.string().required(),
  artistId: Joi.string().required() || null,
  year: Joi.number().required(),
});

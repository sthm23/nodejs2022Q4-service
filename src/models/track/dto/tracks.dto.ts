import * as Joi from 'joi';

export interface TracksDto {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export const TracksSchema = Joi.object({
  name: Joi.string().required(),
  artistId: Joi.string().allow(null).required(),
  albumId: Joi.string().allow(null).required(),
  duration: Joi.number().required(),
});

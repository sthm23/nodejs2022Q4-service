import * as Joi from 'joi';
import { Album } from 'src/models/albums/interfeces/albums.interface';
import { Artist } from 'src/models/artist/interfeces/artist.interface';
import { Track } from 'src/models/track/interfeces/tracks.interface';
import { ArtistSchema } from 'src/models/artist/dto/artist.dto';
import { AlbumsSchema } from 'src/models/albums/dto/albums.dto';
import { TracksSchema } from 'src/models/track/dto/tracks.dto';

export interface FavoritesDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export const FavoriteSchema = Joi.object({
  artists: ArtistSchema,
  albums: AlbumsSchema,
  tracks: TracksSchema,
});

import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DbService } from 'src/db/db.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistService } from '../artist/artist.service';
import { TracksService } from '../track/tracks.service';
// import { UsersService } from '../users/users.service';
// import { v4 as uuidv4 } from 'uuid';
// import { FavoritesDto } from './dto/favorites-dto';
import { Favarite } from './interfaces/favarite.interface';

@Injectable()
export class FavoritesService implements OnModuleInit {
  public favorites: Favarite = {
    artists: [],
    albums: [],
    tracks: [],
  };
  // private trackService: TracksService;
  // private artistService: ArtistService;
  // private albumService: AlbumsService;
  constructor(@Inject(DbService) private db: DbService) {}

  onModuleInit() {
    // this.trackService = this.moduleRef.get(TracksService, { strict: false });
    // this.artistService = this.moduleRef.get(ArtistService, { strict: false });
    // this.albumService = this.moduleRef.get(AlbumsService, { strict: false });
  }

  getAll() {
    return this.db.favorites;
  }

  /* TRACKS OPERATION */
  createTrackById(id: string) {
    const track = this.db.tracks.find((el) => el.id === id);
    if (track === undefined) {
      return track;
    }
    this.db.favorites.tracks.push(id);
    return track;
  }

  deleteTrackById(id: string) {
    const trackId = this.db.favorites.tracks.find((el) => el === id);
    if (trackId === undefined) {
      return trackId;
    }
  }

  /* ALBUMS OPERATION */
  createAlbumById(id: string) {
    const album = this.db.albums.find((el) => el.id === id);
    if (album === undefined) {
      return album;
    }
    this.db.favorites.albums.push(id);
    return album;
  }

  deleteAlbumById(id: string) {
    const albums = this.db.favorites.albums.find((el) => el === id);
    if (albums === undefined) {
      return albums;
    }
    return albums;
  }

  /* ARTIST OPERATION */
  createArtistById(id: string) {
    const artist = this.db.artists.find((el) => el.id === id);
    if (artist === undefined) {
      return artist;
    }
    this.db.favorites.artists.push(id);
    return artist;
  }

  deleteArtistById(id: string) {
    const artists = this.db.favorites.artists.find((el) => el === id);
    if (artists === undefined) {
      return artists;
    }
    return artists;
  }
}

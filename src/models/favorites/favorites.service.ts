import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
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
  private trackService: TracksService;
  private artistService: ArtistService;
  private albumService: AlbumsService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.trackService = this.moduleRef.get(TracksService, { strict: false });
    this.artistService = this.moduleRef.get(ArtistService, { strict: false });
    this.albumService = this.moduleRef.get(AlbumsService, { strict: false });
  }

  getAll() {
    return this.favorites;
  }

  /* TRACKS OPERATION */
  createTrackById(id: string) {
    this.favorites.tracks.push(id);

  }

  deleteTrackById(id: string) {
    const track = this.favorites.tracks.find((el) => el === id);
    if (track === undefined) {
      return track;
    }

  }

  /* ALBUMS OPERATION */
  createAlbumById(id: string) {
    this.favorites.albums.push(id);
  }

  deleteAlbumById(id: string) {
    const albums = this.favorites.albums.find((el) => el === id);
    if (albums === undefined) {
      return albums;
    }
  }

  /* ARTIST OPERATION */
  createArtistById(id: string) {
    this.favorites.artists.push(id);
  }

  deleteArtistById(id: string) {
    const artists = this.favorites.artists.find((el) => el === id);
    if (artists === undefined) {
      return artists;
    }
  }
}

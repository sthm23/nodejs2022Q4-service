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
  public favorites: Favarite[] = [];
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
    // console.log(this.userService.users);
    // console.log(this.albumService.albums);
    // console.log(this.artistService.artists);
    // console.log(this.trackService.tracks);
    return this.favorites;
  }

  /* TRACKS OPERATION */
  createTrackById(id: string) {
    this.favorites.forEach((el) => {
      if (el.tracks) {
        el.tracks.push(id);
      }
    });
  }

  deleteTrackById(id: string) {
    this.favorites.forEach((el) => {
      if (el.tracks) {
        el.tracks.filter((item) => item !== id);
      }
    });
  }

  /* ALBUMS OPERATION */
  createAlbumById(id: string) {
    this.favorites.forEach((el) => {
      if (el.albums) {
        el.albums.push(id);
      }
    });
  }

  deleteAlbumById(id: string) {
    this.favorites.forEach((el) => {
      if (el.albums) {
        el.albums.filter((item) => item !== id);
      }
    });
  }

  /* ARTIST OPERATION */
  createArtistById(id: string) {
    this.favorites.forEach((el) => {
      if (el.artists) {
        el.artists.push(id);
      }
    });
  }

  deleteArtistById(id: string) {
    this.favorites.forEach((el) => {
      if (el.artists) {
        el.artists.filter((item) => item !== id);
      }
    });
  }
}

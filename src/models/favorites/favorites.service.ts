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
    const track = this.trackService.tracks.find((el) => el.id === id);
    if (track === undefined) {
      return track;
    }
    this.favorites.tracks.push(id);
    return track;
  }

  deleteTrackById(id: string) {
    const trackId = this.favorites.tracks.find((el) => el === id);
    if (trackId === undefined) {
      return trackId;
    }
  }

  /* ALBUMS OPERATION */
  createAlbumById(id: string) {
    const album = this.albumService.albums.find((el) => el.id === id);
    if (album === undefined) {
      return album;
    }
    this.favorites.albums.push(id);
    return album;
  }

  deleteAlbumById(id: string) {
    const albums = this.favorites.albums.find((el) => el === id);
    if (albums === undefined) {
      return albums;
    }
    return albums;
  }

  /* ARTIST OPERATION */
  createArtistById(id: string) {
    const artist = this.artistService.artists.find((el) => el.id === id);
    if (artist === undefined) {
      return artist;
    }
    this.favorites.artists.push(id);
    return artist;
  }

  deleteArtistById(id: string) {
    const artists = this.favorites.artists.find((el) => el === id);
    if (artists === undefined) {
      return artists;
    }
    return artists;
  }
}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistService } from '../artist/artist.service';
import { TracksService } from '../track/tracks.service';
// import { UsersService } from '../users/users.service';
// import { v4 as uuidv4 } from 'uuid';
// import { FavoritesDto } from './dto/favorites-dto';
import { Favarite } from './interfaces/favarite.interface';

@Injectable()
export class FavoritesService {
  public favorites: Favarite[] = [];

  constructor(
    // @Inject(UsersService) private userService: UsersService,
    // @Inject(forwardRef(() => AlbumsService))
    // private albumService: AlbumsService,
    // @Inject(forwardRef(() => ArtistService))
    // private artistService: ArtistService,
    // @Inject(forwardRef(() => TracksService))
    // private trackService: TracksService,
  ) {}

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

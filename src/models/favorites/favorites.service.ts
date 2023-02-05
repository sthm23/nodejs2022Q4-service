import { Injectable } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
// import { FavoritesDto } from './dto/favorites-dto';
import { Favarite } from './interfaces/favarite.interface';

@Injectable()
export class FavoritesService {
  private favorites: Favarite[] = [];

  getAll() {
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

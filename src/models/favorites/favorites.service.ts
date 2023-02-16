import { Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(DbService) private db: DbService
    ) {}

  async getAll() {
    const favArr = await this.db.favorites.find({relations: {
      albums: true,
      artists: true,
      tracks: true
    }})
    if(favArr.length === 0) {
     const fav = await this.db.favorites.save({
        albums: [],
        artists: [],
        tracks: [],
      })
      return fav
    }
     return favArr[0];
  }

  /* TRACKS OPERATION */
  async createTrackById(id: string) {
    const track = await this.db.tracks.findOne({where: {id}});
    if (!track) {
      return undefined;
    }
    const fav = await this.getAll();
    fav.tracks.push(track);
    await this.db.favorites.save(fav);
    return track
  }

  async deleteTrackById(id: string) {
    const trackInd = await this.db.tracks.findOneBy({id});
    if (!trackInd) {
      return undefined;
    }
    const fav = await this.getAll();
    const trackFilter = fav.tracks.filter(el=> el.id !== id);
    fav.tracks = trackFilter
    await this.db.favorites.save(fav);
    return true
  }

  /* ALBUMS OPERATION */
  async createAlbumById(id: string) {
    const album = await this.db.albums.findOne({where: {id}});
    if (!album) {
      return undefined;
    }
    const fav = await this.getAll();
    fav.albums.push(album);
    await this.db.favorites.save(fav);
    return album;
  }

  async deleteAlbumById(id: string) {
    const albums = await this.db.albums.findOneBy({id});
    if (!albums) {
      return undefined;
    }
    const fav = await this.getAll();
    const filterAlbum = fav.albums.filter(el=> el.id !== id);
    fav.albums = filterAlbum;
    await this.db.favorites.save(fav);
    return true
  }

  /* ARTIST OPERATION */
  async createArtistById(id: string) {
    const artist = await this.db.artists.findOne({where: {id}});
    if (!artist) {
      return undefined;
    }
    const fav = await this.getAll();
    fav.artists.push(artist);
    await this.db.favorites.save(fav);
    return artist;
  }

  async deleteArtistById(id: string) {
    const artists = await this.db.artists.findOneBy({id});
    if (!artists) {
      return undefined;
    }
    const fav = await this.getAll();
    const filterAlbum = fav.artists.filter(el=> el.id !== id);
    fav.artists = filterAlbum;
    await this.db.favorites.save(fav);
    return true
  }
}

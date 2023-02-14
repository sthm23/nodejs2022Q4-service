import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DbService } from 'src/db/db.service';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entities/fav.entity';

@Injectable()
export class FavoritesService {
  constructor(
    // @InjectRepository(FavoritesEntity)
    // private favRepo: Repository<FavoritesEntity>,
    @Inject(DbService) private db: DbService
    ) {}

  getAll() {
    return this.db.favorites;
    // return this.favRepo.find();
  }

  /* TRACKS OPERATION */
  async createTrackById(id: string) {
    const track = await this.db.tracks.findOne({where: {id}});
    if (track === undefined) {
      return track;
    }
    return this.db.favorites.tracks.save(track);
  }

  async deleteTrackById(id: string) {
    const track = await this.db.favorites.tracks.findOne({where: {id}});
    if (!track) {
      return undefined;
    }
    return await this.db.favorites.tracks.delete(id)
  }

  /* ALBUMS OPERATION */
  async createAlbumById(id: string) {
    const album = await this.db.albums.findOne({where: {id}});
    if (!album) {
      return undefined;
    }
    return this.db.favorites.albums.save(album);
  }

  async deleteAlbumById(id: string) {
    const albums = await this.db.favorites.albums.findOne({where: {id}});
    if (!albums) {
      return undefined;
    }
    return await this.db.favorites.albums.delete(id)
  }

  /* ARTIST OPERATION */
  async createArtistById(id: string) {
    const artist = await this.db.artists.findOne({where: {id}});
    if (!artist) {
      return undefined;
    }
    return this.db.favorites.artists.save(artist);
  }

  async deleteArtistById(id: string) {
    const artists = await this.db.favorites.artists.findOne({where: {id}});
    if (!artists) {
      return undefined;
    }
    return await this.db.favorites.artists.delete(id);
  }
}

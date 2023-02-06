import { Inject, Injectable } from '@nestjs/common';
import { AlbumsDto } from './dto/albums.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfeces/albums.interface';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumsService {
  constructor(@Inject(DbService) private db: DbService) {}

  getAll() {
    return this.db.albums;
  }

  getOneById(id: string) {
    const album = this.db.albums.find((el) => el.id === id);
    return album;
  }

  create(dto: AlbumsDto) {
    const newAlbum = { ...dto } as Album;
    newAlbum.id = uuidv4();
    const artist = this.db.artists.find((el) => el.id === dto.artistId);
    if(artist === undefined) {
      return undefined;
    }
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  updateOne(id: string, dto: AlbumsDto) {
    const album = this.db.albums.find((el) => el.id === id);
    if (album === undefined) {
      return album;
    }
    const albumIndex = this.db.albums.findIndex((el) => el.id === id);
    const artist = this.db.artists.find((el) => el.id === dto.artistId);
    if(artist === undefined) {
      return undefined;
    }
    const updAlbum = { ...album, ...dto } as Album;
    this.db.albums.splice(albumIndex, 1, updAlbum);
    return updAlbum;
  }

  deleteAlbum(id: string) {
    const album = this.db.albums.find((el) => el.id === id);
    const albumIndex = this.db.albums.findIndex((el) => el.id === id);
    this.db.albums.splice(albumIndex, 1);
    const favAlbumIndex = this.db.favorites.albums.findIndex((el)=> el === album.id);
    if(favAlbumIndex !== -1) {
      this.db.favorites.albums.splice(favAlbumIndex, 1);
    }
    const trackInd = this.db.tracks.findIndex((el) => el.albumId === album.id);
    if(trackInd !== -1) {
      this.db.tracks.splice(trackInd, 1, null);
    }
    return album;
  }
}

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsDto } from './dto/albums.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfeces/albums.interface';

@Injectable()
export class AlbumsService {
  public albums: Album[] = [];

  getAll() {
    return this.albums;
  }

  getOneById(id: string) {
    const album = this.albums.find((el) => el.id === id);
    return album;
  }

  create(dto: AlbumsDto) {
    const newAlbum = { ...dto } as Album;
    newAlbum.id = uuidv4();
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateOne(id: string, dto: AlbumsDto) {
    const album = this.albums.find((el) => el.id === id);
    if (album === undefined) {
      return album;
    }
    const albumIndex = this.albums.findIndex((el) => el.id === id);
    const updAlbum = { ...album, ...dto } as Album;
    this.albums.splice(albumIndex, 1, updAlbum);
    return updAlbum;
  }

  deleteAlbum(id: string) {
    const album = this.albums.find((el) => el.id === id);
    const albumIndex = this.albums.findIndex((el) => el.id === id);
    this.albums.splice(albumIndex, 1);
    return album;
  }
}

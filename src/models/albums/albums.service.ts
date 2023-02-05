import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AlbumsDto } from './dto/albums.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfeces/albums.interface';
import { ArtistService } from '../artist/artist.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../track/tracks.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AlbumsService implements OnModuleInit {
  public albums: Album[] = [];

  private trackService: TracksService;
  private favService: FavoritesService;
  private artistService: ArtistService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.trackService = this.moduleRef.get(TracksService, { strict: false });
    this.favService = this.moduleRef.get(FavoritesService, { strict: false });
    this.artistService = this.moduleRef.get(ArtistService, { strict: false });
  }

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
    const arr = this.favService.favorites.albums.filter(
      (el) => el !== album.id,
    );
    this.favService.favorites.albums = arr;
    this.trackService.tracks.forEach((el) => {
      if (el.albumId === album.id) {
        el = null;
      }
    });
    return album;
  }
}

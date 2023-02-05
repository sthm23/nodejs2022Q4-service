import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfeces/artist.interface';
import { TracksService } from '../track/tracks.service';
import { ModuleRef } from '@nestjs/core';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { OnModuleInit } from '@nestjs/common/interfaces';

@Injectable()
export class ArtistService implements OnModuleInit {
  public artists: Artist[] = [];

  private trackService: TracksService;
  private favService: FavoritesService;
  private albumService: AlbumsService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.trackService = this.moduleRef.get(TracksService, { strict: false });
    this.favService = this.moduleRef.get(FavoritesService, { strict: false });
    this.albumService = this.moduleRef.get(AlbumsService, { strict: false });
  }

  getAll() {
    return this.artists;
  }

  getOneById(id: string) {
    const artist = this.artists.find((el) => el.id === id);
    return artist;
  }

  create(dto: ArtistDto) {
    const newartist = { ...dto } as Artist;
    newartist.id = uuidv4();
    this.artists.push(newartist);
    return newartist;
  }

  updateOne(id: string, dto: ArtistDto) {
    const artist = this.artists.find((el) => el.id === id);
    if (artist === undefined) {
      return artist;
    }
    const artistIndex = this.artists.findIndex((el) => el.id === id);
    const updArtist = { ...artist, ...dto } as Artist;
    this.artists.splice(artistIndex, 1, updArtist);
    return updArtist;
  }

  deleteArtist(id: string) {
    const artist = this.artists.find((el) => el.id === id);
    const artistIndex = this.artists.findIndex((el) => el.id === id);
    this.artists.splice(artistIndex, 1);
    const artFavArr = this.favService.favorites.artists.filter(
      (el) => el !== id,
    );
    this.favService.favorites.artists = artFavArr;
    this.albumService.albums.forEach((el) => {
      if (el.artistId === artist.id) {
        el.artistId = null;
      }
    });
    this.trackService.tracks.forEach((el) => {
      if (el.artistId === artist.id) {
        el.artistId = null;
      }
    });
    return artist;
  }
}

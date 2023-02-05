import { OnModuleInit } from '@nestjs/common/interfaces';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TracksDto } from './dto/tracks.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './interfeces/tracks.interface';
import { UsersService } from '../users/users.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistService } from '../artist/artist.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class TracksService implements OnModuleInit {
  public tracks: Track[] = [];
  albumService: AlbumsService;
  artistService: ArtistService;
  favService: FavoritesService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.artistService = this.moduleRef.get(ArtistService, { strict: false });
    this.favService = this.moduleRef.get(FavoritesService, { strict: false });
    this.albumService = this.moduleRef.get(AlbumsService, { strict: false });
  }

  getAll() {
    return this.tracks;
  }

  getOneById(id: string) {
    const track = this.tracks.find((el) => el.id === id);
    return track;
  }

  create(dto: TracksDto) {
    const newtrack = { ...dto } as Track;
    newtrack.id = uuidv4();
    this.tracks.push(newtrack);
    return newtrack;
  }

  updateOne(id: string, dto: TracksDto) {
    const track = this.tracks.find((el) => el.id === id);
    if (track === undefined) {
      return track;
    }
    const trackIndex = this.tracks.findIndex((el) => el.id === id);
    const updtrack = { ...track, ...dto } as Track;
    this.tracks.splice(trackIndex, 1, updtrack);
    return updtrack;
  }

  deleteTrack(id: string) {
    const track = this.tracks.find((el) => el.id === id);
    const trackIndex = this.tracks.findIndex((el) => el.id === id);
    this.tracks.splice(trackIndex, 1);
    return track;
  }
}

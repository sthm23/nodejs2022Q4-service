import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TracksDto } from './dto/tracks.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './interfeces/tracks.interface';
import { UsersService } from '../users/users.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistService } from '../artist/artist.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  public tracks: Track[] = [];

  constructor(
    // @Inject(UsersService) private userService: UsersService,
    @Inject(AlbumsService) private albumService: AlbumsService,
    @Inject(ArtistService) private artistService: ArtistService,
    @Inject(FavoritesService) private favService: FavoritesService,
  ) {}

  getAll() {
    // console.log(this.userService.users);
    console.log(this.albumService.albums);
    console.log(this.artistService.artists);
    console.log(this.favService.favorites);

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

import { Injectable } from '@nestjs/common';
import { TracksDto } from './dto/tracks.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './interfeces/tracks.interface';

@Injectable()
export class TracksService {
  private artists: Track[] = [];

  getAll() {
    return this.artists;
  }

  getOneById(id: string) {
    const artist = this.artists.find((el) => el.id === id);
    return artist;
  }

  create(dto: TracksDto) {
    const newartist = { ...dto } as Track;
    newartist.id = uuidv4();
    this.artists.push(newartist);
    return newartist;
  }

  updateOne(id: string, dto: TracksDto) {
    const artist = this.artists.find((el) => el.id === id);
    if (artist === undefined) {
      return artist;
    }
    const artistIndex = this.artists.findIndex((el) => el.id === id);
    const updArtist = { ...artist, ...dto } as Track;
    this.artists.splice(artistIndex, 1, updArtist);
    return updArtist;
  }

  deleteArtist(id: string) {
    const artist = this.artists.find((el) => el.id === id);
    const artistIndex = this.artists.findIndex((el) => el.id === id);
    this.artists.splice(artistIndex, 1);
    return artist;
  }
}

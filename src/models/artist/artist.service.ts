import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfeces/artist.interface';

@Injectable()
export class ArtistService {
  public artists: Artist[] = [];

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
    return artist;
  }
}

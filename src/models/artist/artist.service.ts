import { Inject, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfeces/artist.interface';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(DbService) private db: DbService
    ) {}

  getAll() {
    return this.db.artists.find();
  }

  async getOneById(id: string) {
    const artist = await this.db.artists.findOne({where:{id}});
    if(!artist){
      return undefined
    }
    return artist
  }

  create({ grammy, name }: ArtistDto) {
    const newArtist = {
      id: uuidv4(),
      grammy,
      name,
    } as Artist;
    const artist = this.db.artists.create(newArtist);
    return this.db.artists.save(artist);
  }

  async updateOne(id: string, dto: ArtistDto) {
    const artist = await this.db.artists.findOne({where:{id}});
    if (!artist) {
      return undefined;
    }
    const updArtist = { ...artist, ...dto } as Artist;
    return this.db.artists.save(updArtist);
  }

  async deleteArtist(id: string) {
    const artist = await this.db.artists.findOne({where:{id}});
    if (!artist) {
      return undefined;
    }

    const favArtInd = this.db.favorites.artists.findIndex((el) => el.id === id);
    if (favArtInd !== -1) {
      this.db.favorites.artists.splice(favArtInd, 1);
    }

    await this.db.artists.delete(id)
    return true
  }
}

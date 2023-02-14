import { Inject, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfeces/artist.interface';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/db/interfaces';
import { AlbumsEntity } from '../albums/entities/album.entity';

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

    const favArtInd = await this.db.favorites.artists.findOne({where:{id}});
    if (favArtInd) {
      await this.db.favorites.artists.delete(id);
    }

    const albumInd = await this.db.albums.findOne({where:{artistId: id}});
    if (albumInd) {
      const obj = { ...albumInd, artistId: null } as AlbumsEntity;
      await this.db.albums.save(obj)
    }

    const trackInd = await this.db.tracks.findOne({where:{artistId: id}});
    if (trackInd) {
      const obj = { ...trackInd, artistId: null } as Track;

      await this.db.tracks.save(obj);
    }
    await this.db.artists.delete(id)
    return true
  }
}

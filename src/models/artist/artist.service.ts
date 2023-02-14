import { Inject, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfeces/artist.interface';
import { DbService } from 'src/db/db.service';
import { Album, Track } from 'src/db/interfaces';
import { ArtistsEntity } from './entities/artists.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsEntity } from '../albums/entities/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    // @InjectRepository(ArtistsEntity)
    // private artistRepo: Repository<ArtistsEntity>,
    @Inject(DbService) private db: DbService
    ) {}

  getAll() {
    return this.db.artists.find();
    // return this.artistRepo.find();
  }

  getOneById(id: string) {
    // const artist = this.db.artists.find((el) => el.id === id);
    // return artist;

    return this.db.artists.findOne({where:{id}});
  }

  create({ grammy, name }: ArtistDto) {
    const newArtist = {
      id: uuidv4(),
      grammy,
      name,
    } as Artist;
    // this.db.artists.push(newArtist);
    // return newArtist;
    const artist = this.db.artists.create(newArtist);
    return this.db.artists.save(artist);
  }

  async updateOne(id: string, dto: ArtistDto) {
    // const artist = this.db.artists.find((el) => el.id === id);
    const artist = await this.db.artists.findOne({where:{id}});
    if (artist === undefined) {
      return artist;
    }
    // const artistIndex = this.db.artists.findIndex((el) => el.id === id);
    const updArtist = { ...artist, ...dto } as Artist;
    // this.db.artists.splice(artistIndex, 1, updArtist);
    // return updArtist;
    return this.db.artists.save(updArtist);
  }

  async deleteArtist(id: string) {
    // const artist = this.db.artists.find((el) => el.id === id);
    const artist = await this.db.artists.findOne({where:{id}});
    if (artist === undefined) {
      return undefined;
    }
    // const artistIndex = this.db.artists.findIndex((el) => el.id === id);
    // this.db.artists.splice(artistIndex, 1);

    const favArtInd = await this.db.favorites.artists.findOne({where:{id}});
    if (!favArtInd) {
      await this.db.favorites.artists.delete(id);
    }

    const albumInd = await this.db.albums.findOne({where:{id}});
    // const album = this.db.albums.find((el) => el.artistId === id);
    if (!albumInd) {
      const obj = { ...albumInd, artistId: null } as AlbumsEntity;
      await this.db.albums.save(obj)
    }

    const trackInd = await this.db.tracks.findOne({where:{id}});
    // const track = this.db.tracks.find((el) => el.artistId === id);
    if (!trackInd) {
      const obj = { ...trackInd, artistId: null } as Track;

      await this.db.tracks.save(obj);
    }
    // return artist;

    await this.db.artists.delete(id)
  }
}

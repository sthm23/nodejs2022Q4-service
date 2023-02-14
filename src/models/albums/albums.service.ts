import { Inject, Injectable } from '@nestjs/common';
import { AlbumsDto } from './dto/albums.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfeces/albums.interface';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/db/interfaces';
import { AlbumsEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    // @InjectRepository(AlbumsEntity)
    // private albumRepo: Repository<AlbumsEntity>,
    @Inject(DbService) private db: DbService
    ) {}

  getAll() {
    // return this.db.albums;
    return this.db.albums.find();
  }

  getOneById(id: string) {
    // const album = this.db.albums.find((el) => el.id === id);
    // return album;
    return this.db.albums.findOne({where: {id}});
  }

  async create(dto: AlbumsDto) {
    const newAlbum = { id: uuidv4(), ...dto } as Album;
    // newAlbum.id = uuidv4();
    const artist = await this.db.artists.findOne({where: {id: dto.artistId}});
    if (artist === undefined && dto.artistId !== null) {
      return undefined;
    }
    // this.db.albums.push(newAlbum);
    // return newAlbum;
    const album = this.db.albums.create(newAlbum);
    return this.db.albums.save(album);

  }

  async updateOne(id: string, dto: AlbumsDto) {
    // const album = this.db.albums.find((el) => el.id === id);
    const album =  await this.db.albums.findOne({where: {id}});
    if (album === undefined) {
      return album;
    }
    // const albumIndex = this.db.albums.findIndex((el) => el.id === id);
    const artist = await this.db.artists.findOne({where: {id: dto.artistId}});
    if (artist === undefined && dto.artistId !== null) {
      return undefined;
    }
    const updAlbum = { ...album, ...dto } as Album;
    return await this.db.albums.save(updAlbum);
    // this.db.albums.splice(albumIndex, 1, updAlbum);
    // return updAlbum;
  }

  async deleteAlbum(id: string) {
    // const album = this.db.albums.find((el) => el.id === id);
    const album = await  this.db.albums.findOne({where: {id}});
    if (album === undefined) {
      return undefined;
    }

    const favAlbumIndex = await this.db.favorites.albums.findOne({where:{id: id}})
    if (!favAlbumIndex) {
      this.db.favorites.albums.delete(id)
    }
    // const trackInd = this.db.tracks.findIndex((el) => el.albumId === id);
    const track = await this.db.tracks.findOne({where:{albumId: id}})
    if (!track) {
      const obj = { ...track, albumId: null } as Track;
      await this.db.tracks.save(obj);
    }
    // const albumIndex = this.db.albums.findIndex((el) => el.id === id);
    // this.db.albums.splice(albumIndex, 1);
    // return album;
    await this.db.albums.delete(id);
  }
}

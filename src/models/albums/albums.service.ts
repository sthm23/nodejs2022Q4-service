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
    @InjectRepository(AlbumsEntity)
    private albumRepo: Repository<AlbumsEntity>,
    @Inject(DbService) private db: DbService
    ) {}

  getAll() {
    // return this.db.albums;
    return this.albumRepo.find();
  }

  getOneById(id: string) {
    // const album = this.db.albums.find((el) => el.id === id);
    // return album;
    return this.albumRepo.findOne({where: {id}});
  }

  create(dto: AlbumsDto) {
    const newAlbum = { id: uuidv4(), ...dto } as Album;
    // newAlbum.id = uuidv4();
    // const artist = this.db.artists.find((el) => el.id === dto.artistId);
    // if (artist === undefined && dto.artistId !== null) {
    //   return undefined;
    // }
    // this.db.albums.push(newAlbum);
    // return newAlbum;
    const album = this.albumRepo.create(newAlbum);
    return this.albumRepo.save(album);

  }

  async updateOne(id: string, dto: AlbumsDto) {
    // const album = this.db.albums.find((el) => el.id === id);
    const album =  await this.albumRepo.findOne({where: {id}});
    // if (album === undefined) {
    //   return album;
    // }
    // const albumIndex = this.db.albums.findIndex((el) => el.id === id);
    // const artist = this.db.artists.find((el) => el.id === dto.artistId);
    // if (artist === undefined && dto.artistId !== null) {
    //   return undefined;
    // }
    const updAlbum = { ...album, ...dto } as Album;
    return this.albumRepo.save(updAlbum);
    // this.db.albums.splice(albumIndex, 1, updAlbum);
    // return updAlbum;
  }

  async deleteAlbum(id: string) {
    // const album = this.db.albums.find((el) => el.id === id);
    const album = await  this.albumRepo.findOne({where: {id}});
    if (album === undefined) {
      return undefined;
    }

    // const favAlbumIndex = this.db.favorites.albums.findIndex(
    //   (el) => el.id === album.id,
    // );
    // if (favAlbumIndex !== -1) {
    //   this.db.favorites.albums.splice(favAlbumIndex, 1);
    // }
    // const trackInd = this.db.tracks.findIndex((el) => el.albumId === id);
    // const track = this.db.tracks.find((el) => el.albumId === id);
    // if (trackInd !== -1) {
    //   const obj = { ...track } as Track;
    //   obj.albumId = null;
    //   this.db.tracks.splice(trackInd, 1, obj);
    // }
    // const albumIndex = this.db.albums.findIndex((el) => el.id === id);
    // this.db.albums.splice(albumIndex, 1);
    // return album;
    await this.albumRepo.delete(id);
  }
}

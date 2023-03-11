import { Inject, Injectable } from '@nestjs/common';
import { AlbumsDto } from './dto/albums.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfeces/albums.interface';
import { DbService } from 'src/db/db.service';
import { Track } from 'src/db/interfaces';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(DbService) private db: DbService
    ) {}

  getAll() {
    return this.db.albums.find();
  }

  getOneById(id: string) {
    const album = this.db.albums.findOne({where: {id}});
    if(!album) return undefined
    return album;
  }

  async create(dto: AlbumsDto) {
    const album = this.db.albums.create(dto);
    return this.db.albums.save(album);
  }

  async updateOne(id: string, dto: AlbumsDto) {
    const album =  await this.db.albums.findOne({where: {id}});
    if (!album) {
      return album;
    }
    const artist = await this.db.artists.findOne({where: {id: dto.artistId}});
    if (!artist && dto.artistId !== null) {
      return undefined;
    }
    const updAlbum = { ...album, ...dto } as Album;
    return await this.db.albums.save(updAlbum);
  }

  async deleteAlbum(id: string) {
    const album = await  this.db.albums.findOne({where: {id}});
    if (!album) {
      return undefined;
    }
    
    await this.db.albums.delete(id);
    return true
  }
}

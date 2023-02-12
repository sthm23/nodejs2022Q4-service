import { Inject, Injectable } from '@nestjs/common';
import { TracksDto } from './dto/tracks.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './interfeces/tracks.interface';
import { DbService } from 'src/db/db.service';
import { TracksEntity } from './entities/tracks.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TracksEntity)
    private trackRepo: Repository<TracksEntity>,
    @Inject(DbService) private db: DbService
    ) {}

  getAll():Promise<TracksEntity[]> {
    // return this.db.tracks;
    return this.trackRepo.find();
  }

  getOneById(id: string) {
    // const track = this.db.tracks.find((el) => el.id === id);
    // return track;
    return this.trackRepo.findOne({where:{id}});
  }

  async create(dto: TracksDto) {
    const newtrack = { id: uuidv4(), ...dto } as TracksEntity;
    // newtrack.id =;
    // const art = this.db.artists.find((el) => el.id === dto.artistId);
    // const album = this.db.albums.find((el) => el.id === dto.albumId);
    // if (album === undefined && dto.albumId !== null) {
    //   return undefined;
    // }
    // if (art === undefined && dto.artistId !== null) {
    //   return undefined;
    // }
    // this.db.tracks.push(newtrack);
    // return newtrack;

    const track = this.trackRepo.create(newtrack);
    return this.trackRepo.save(track);


  }

  async updateOne(id: string, dto: TracksDto) {
    // const track = this.db.tracks.find((el) => el.id === id);
    const track = await this.trackRepo.findOne({where:{id}});

    // const art = this.db.artists.find((el) => el.id === dto.artistId);
    // const album = this.db.albums.find((el) => el.id === dto.albumId);
    // if (album === undefined && dto.albumId !== null) {
    //   return undefined;
    // }
    // if (art === undefined && dto.artistId !== null) {
    //   return undefined;
    // }
    if (track === undefined) {
      return undefined;
    }
    // const trackIndex = this.db.tracks.findIndex((el) => el.id === id);
    // const updtrack = { ...track, ...dto } as Track;
    const updTrack = { ...track, ...dto } as TracksEntity;
    return this.trackRepo.save(updTrack)
    // this.db.tracks.splice(trackIndex, 1, updtrack);
    // return updtrack;
  }

  async deleteTrack(id: string) {
    // const track = this.db.tracks.find((el) => el.id === id);
    const track = await this.trackRepo.findOne({where:{id}});
    if (track === undefined) {
      return undefined;
    }
    // const trackIndex = this.db.tracks.findIndex((el) => el.id === id);
    // this.db.tracks.splice(trackIndex, 1);
    // const ind = this.db.favorites.tracks.findIndex((el) => el.id === id);
    // if (ind !== -1) {
    //   this.db.favorites.tracks.splice(ind, 1);
    // }
    // return track;
    await this.trackRepo.delete(id);
  }
}

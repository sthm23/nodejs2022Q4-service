import { Inject, Injectable } from '@nestjs/common';
import { TracksDto } from './dto/tracks.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './interfeces/tracks.interface';
import { DbService } from 'src/db/db.service';
import { TracksEntity } from './entities/tracks.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TracksService {
  constructor(
    // @InjectRepository(TracksEntity)
    // private trackRepo: Repository<TracksEntity>,
    @Inject(DbService) private db: DbService
    ) {}

  getAll():Promise<TracksEntity[]> {
    return this.db.tracks.find();
    // return this.trackRepo.find();
  }

  getOneById(id: string) {
    // const track = this.db.tracks.find((el) => el.id === id);
    // return track;
    return this.db.tracks.findOne({where:{id}});
  }

  async create(dto: TracksDto) {
    const newtrack = { id: uuidv4(), ...dto } as TracksEntity;

    const art = this.db.artists.findOne({where:{id: dto.artistId}});
    const album = this.db.albums.findOne({where:{id: dto.albumId}});

    if (album === undefined && dto.albumId !== null) {
      return undefined;
    }

    if (art === undefined && dto.artistId !== null) {
      return undefined;
    }
    const track = this.db.tracks.create(newtrack);
    return this.db.tracks.save(track);


  }

  async updateOne(id: string, dto: TracksDto) {
    const track = await this.db.tracks.findOne({where:{id}});
    // const track = await this.trackRepo.findOne({where:{id}});

    const art = this.db.artists.findOne({where:{id: dto.artistId}});
    const album = this.db.albums.findOne({where:{id: dto.albumId}});
    if (album === undefined && dto.albumId !== null) {
      return undefined;
    }
    if (art === undefined && dto.artistId !== null) {
      return undefined;
    }
    if (track === undefined) {
      return undefined;
    }
    // const trackIndex = this.db.tracks.findIndex((el) => el.id === id);
    // const updtrack = { ...track, ...dto } as Track;
    const updTrack = { ...track, ...dto } as TracksEntity;
    return this.db.tracks.save(updTrack);
  }

  async deleteTrack(id: string) {
    const track = await this.db.tracks.findOne({where:{id}});
    // const track = await this.trackRepo.findOne({where:{id}});
    if (track === undefined) {
      return undefined;
    }
    const ind = await this.db.favorites.tracks.findOne({where:{id}});
    if (!ind) {
      await this.db.favorites.tracks.delete(id);
    }
    // return track;
    await this.db.tracks.delete(id);
  }
}

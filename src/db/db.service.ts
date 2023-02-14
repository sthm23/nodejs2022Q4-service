import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsEntity } from 'src/models/albums/entities/album.entity';
import { ArtistsEntity } from 'src/models/artist/entities/artists.entity';
import { TracksEntity } from 'src/models/track/entities/tracks.entity';
import { UsersEntity } from 'src/models/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Album, Artist, Favarite, FavRepoInterface, Track, User } from './interfaces';

@Injectable()
export class DbService implements OnModuleInit {
  public users:Repository<UsersEntity>;
  public artists: Repository<ArtistsEntity>;
  public tracks: Repository<TracksEntity>;
  public albums: Repository<AlbumsEntity>;
  public favorites: {
    artists: Repository<ArtistsEntity>,
    albums: Repository<AlbumsEntity>,
    tracks: Repository<TracksEntity>,
  };

  constructor(
    @InjectRepository(UsersEntity)
    public usersRepository: Repository<UsersEntity>,
    @InjectRepository(TracksEntity)
    private trackRepo: Repository<TracksEntity>,
    @InjectRepository(ArtistsEntity)
    private artistRepo: Repository<ArtistsEntity>,
    @InjectRepository(AlbumsEntity)
    private albumRepo: Repository<AlbumsEntity>,
    // @InjectRepository(FavoritesEntity)
    // public favRepo: Repository<FavoritesEntity>,
  ){}
  onModuleInit() {
    this.users = this.usersRepository;
    this.tracks = this.trackRepo;
    this.artists = this.artistRepo;
    this.albums = this.albumRepo;
    this.favorites = {
      tracks: this.trackRepo,
      artists: this.artistRepo,
      albums: this.albumRepo,
    }
  }

}

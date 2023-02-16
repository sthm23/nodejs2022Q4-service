import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsEntity } from 'src/models/albums/entities/album.entity';
import { ArtistsEntity } from 'src/models/artist/entities/artists.entity';
import { FavoriteEntity } from 'src/models/favorites/entities/fav.entity';
import { TracksEntity } from 'src/models/track/entities/tracks.entity';
import { UsersEntity } from 'src/models/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DbService implements OnModuleInit {
  public users:Repository<UsersEntity>;
  public artists: Repository<ArtistsEntity>;
  public tracks: Repository<TracksEntity>;
  public albums: Repository<AlbumsEntity>;
  public favorites: Repository<FavoriteEntity>

  constructor(
    @InjectRepository(UsersEntity)
    public usersRepository: Repository<UsersEntity>,
    @InjectRepository(TracksEntity)
    private trackRepo: Repository<TracksEntity>,
    @InjectRepository(ArtistsEntity)
    private artistRepo: Repository<ArtistsEntity>,
    @InjectRepository(AlbumsEntity)
    private albumRepo: Repository<AlbumsEntity>,
    @InjectRepository(FavoriteEntity)
    private favRepo: Repository<FavoriteEntity>,
  ){}
  async onModuleInit() {
    this.users = this.usersRepository;
    this.tracks = this.trackRepo;
    this.artists = this.artistRepo;
    this.albums = this.albumRepo;
    this.favorites = this.favRepo;
  }

}

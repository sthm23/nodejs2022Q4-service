import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsEntity } from 'src/models/albums/entities/album.entity';
import { ArtistsEntity } from 'src/models/artist/entities/artists.entity';
import { TracksEntity } from 'src/models/track/entities/tracks.entity';
import { UsersEntity } from 'src/models/users/entities/users.entity';
import { DbService } from './db.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumsEntity, ArtistsEntity, TracksEntity, UsersEntity])
  ],
  controllers: [],
  providers: [DbService],
  exports: [DbService, TypeOrmModule],
})
export class DbModule {}

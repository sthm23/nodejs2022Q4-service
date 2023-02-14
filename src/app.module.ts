import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './models/artist/artist.module';
import { TrackModule } from './models/track/track.module';
import { UsersModule } from './models/users/users.module';
import { AlbumsModule } from './models/albums/albums.module';
import { FavoritesModule } from './models/favorites/favorites.module';
import { DbModule } from './db/db.module';
import { UsersEntity } from './models/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksEntity } from './models/track/entities/tracks.entity';
import { AlbumsEntity } from './models/albums/entities/album.entity';
import { ArtistsEntity } from './models/artist/entities/artists.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PW,
      database: process.env.POSTGRES_DB,
      entities: [UsersEntity, TracksEntity, AlbumsEntity, ArtistsEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    DbModule,

    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

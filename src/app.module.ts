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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sthm23',
      password: 'admin',
      database: 'music_lib',
      entities: [UsersEntity],
      synchronize: true,
    }),
    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumsModule,
    FavoritesModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

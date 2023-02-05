import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './models/artist/artist.module';
import { TrackModule } from './models/track/track.module';
import { UsersModule } from './models/users/users.module';
import { AlbumsModule } from './models/albums/albums.module';
import { FavoritesModule } from './models/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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

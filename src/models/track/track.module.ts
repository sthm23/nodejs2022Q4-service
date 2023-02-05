import { TracksController } from './tracks.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
// import { UsersModule } from '../users/users.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TrackModule {}

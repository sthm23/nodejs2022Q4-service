import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';
import { ArtistsController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}

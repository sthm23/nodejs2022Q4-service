import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistModule),
  ],
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}

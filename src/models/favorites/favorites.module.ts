import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
// import { UsersModule } from '../users/users.module';
import { FavaritesController } from './favarites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [FavaritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}

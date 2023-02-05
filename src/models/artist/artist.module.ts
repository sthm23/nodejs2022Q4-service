import { Module } from '@nestjs/common';
import { ArtistsController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistService],
})
export class ArtistModule {}

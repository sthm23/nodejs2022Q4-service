import { Module } from '@nestjs/common';
import { FavaritesController } from './favarites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavaritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entities/fav.entity';
import { FavaritesController } from './favarites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  // imports: [TypeOrmModule.forFeature([FavoritesEntity])],
  controllers: [FavaritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}

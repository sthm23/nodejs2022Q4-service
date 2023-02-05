import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}

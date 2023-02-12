import { TracksController } from './tracks.controller';
import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksEntity } from './entities/tracks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TracksEntity])],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TrackModule {}

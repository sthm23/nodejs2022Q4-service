import { TracksController } from './tracks.controller';
import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TrackModule {}

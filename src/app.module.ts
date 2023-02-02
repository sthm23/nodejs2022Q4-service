import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './models/artist/artist.module';
import { TrackModule } from './models/track/track.module';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './models/artist/artist.module';
import { TrackModule } from './models/track/track.module';
import { UsersModule } from './models/users/users.module';
import { AlbumsModule } from './models/albums/albums.module';
import { FavoritesModule } from './models/favorites/favorites.module';
import { DbModule } from './db/db.module';
import { UsersEntity } from './models/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksEntity } from './models/track/entities/tracks.entity';
import { AlbumsEntity } from './models/albums/entities/album.entity';
import { ArtistsEntity } from './models/artist/entities/artists.entity';
import { FavoriteEntity } from './models/favorites/entities/fav.entity';
import { AuthModule } from './models/auth/auth.module';
import { LoggerModule } from './models/logger/logger.module';
import { LoggerMiddleware } from './models/logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST_NAME,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PW,
      database: process.env.POSTGRES_DB,
      entities: [UsersEntity, TracksEntity, AlbumsEntity, ArtistsEntity, FavoriteEntity],
      synchronize: true,
      autoLoadEntities: true,
      // logging: true,
      // migrations: []
    }),
    DbModule,
    AuthModule,
    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumsModule,
    FavoritesModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

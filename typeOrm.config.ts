import { DataSource } from 'typeorm';
import 'dotenv/config';
import { UsersEntity } from './src/models/users/entities/users.entity';
import { AlbumsEntity } from './src/models/albums/entities/album.entity';
import { ArtistsEntity } from './src/models/artist/entities/artists.entity';
import { TracksEntity } from './src/models/track/entities/tracks.entity';
import { FavoriteEntity } from './src/models/favorites/entities/fav.entity';
import { migrationFile1676905919135 } from './migrations/1676905919135-migration-file';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PW,
  database: process.env.POSTGRES_DB,

  entities: ['src/models/**/*.entity.js'],
  // entities: [UsersEntity, AlbumsEntity, ArtistsEntity, TracksEntity, FavoriteEntity],
  migrations: [migrationFile1676905919135],
  migrationsRun: true,
});

export default dataSource;
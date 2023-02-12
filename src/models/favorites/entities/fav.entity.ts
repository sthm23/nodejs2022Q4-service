import { AlbumsEntity } from 'src/models/albums/entities/album.entity';
import { ArtistsEntity } from 'src/models/artist/entities/artists.entity';
import { TracksEntity } from 'src/models/track/entities/tracks.entity';
import { Entity, Column, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  artists: ArtistsEntity[];

  @Column()
  albums: AlbumsEntity[];

//   @Column({ default: 1 })
//   version: number;

  @Column()
  tracks: TracksEntity[];

//   @Column()
//   updatedAt: string;
}
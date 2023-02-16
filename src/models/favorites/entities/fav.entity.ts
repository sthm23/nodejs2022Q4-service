import { Exclude } from 'class-transformer';
import { AlbumsEntity } from 'src/models/albums/entities/album.entity';
import { ArtistsEntity } from 'src/models/artist/entities/artists.entity';
import { TracksEntity } from 'src/models/track/entities/tracks.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable,  } from 'typeorm';

@Entity()
export class FavoriteEntity  {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => AlbumsEntity, {eager: true})
  @JoinTable()
  albums: Array<AlbumsEntity>;

  @ManyToMany(() => ArtistsEntity, {eager: true})
  @JoinTable()
  artists: Array<ArtistsEntity>;

  @ManyToMany(() => TracksEntity, {eager: true})
  @JoinTable()
  tracks: Array<TracksEntity>;
}
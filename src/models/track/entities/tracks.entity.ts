import { AlbumsEntity } from 'src/models/albums/entities/album.entity';
import { ArtistsEntity } from 'src/models/artist/entities/artists.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation,  } from 'typeorm';

@Entity()
export class TracksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ArtistsEntity, { nullable: true, onDelete: 'SET NULL'})
  @JoinColumn()
  artist: Relation<ArtistsEntity>

  @Column({nullable: true})
  artistId: ArtistsEntity['id'] | null;

  @ManyToOne(() => AlbumsEntity, { nullable: true, onDelete: 'SET NULL'})
  @JoinColumn()
  album: Relation<AlbumsEntity>

  @Column({ nullable: true })
  albumId: AlbumsEntity['id'] | null;

  @Column('int')
  duration: number;
}
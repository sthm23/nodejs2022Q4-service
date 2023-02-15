import { ArtistsEntity } from 'src/models/artist/entities/artists.entity';
import { Entity, Column, PrimaryGeneratedColumn, Relation, OneToMany, JoinColumn, ManyToOne,  } from 'typeorm';

@Entity()
export class AlbumsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  year: number;

  @ManyToOne(() => ArtistsEntity, { nullable: true, onDelete: 'SET NULL'})
  @JoinColumn()
  artist: Relation<ArtistsEntity>

  @Column({ nullable: true })
  artistId: ArtistsEntity['id'] | null;


}
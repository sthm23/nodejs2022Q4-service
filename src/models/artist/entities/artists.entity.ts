import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Relation,  } from 'typeorm';

@Entity()
export class ArtistsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;


}
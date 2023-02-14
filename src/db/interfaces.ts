import { AlbumsEntity } from "src/models/albums/entities/album.entity";
import { ArtistsEntity } from "src/models/artist/entities/artists.entity";
import { TracksEntity } from "src/models/track/entities/tracks.entity";
import { Repository } from "typeorm";

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface Favarite {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}

// export interface users:Repository<UsersEntity>;
// public artists: Repository<ArtistsEntity>;
// public tracks: Repository<TracksEntity>;
// public albums: Repository<AlbumsEntity>;
export interface FavRepoInterface {
  artists: Repository<ArtistsEntity>,
  albums: Repository<AlbumsEntity>,
  tracks: Repository<TracksEntity>,
}
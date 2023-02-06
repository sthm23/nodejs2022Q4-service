import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';


@Injectable()
export class DbService {
    public users = []
    public artists = []
    public tracks = []
    public albums = []
    public favorites = {
        artists: [],
        albums: [],
        tracks: [],
    }
}
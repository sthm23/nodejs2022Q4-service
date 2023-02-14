import { AlbumsService } from './albums.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsDto, AlbumsSchema } from './dto/albums.dto';
import { AlbumsValidatePipe } from './pipes/albumsValidate.pipe';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAlbums() {
    return await this.albumsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const album = await this.albumsService.getOneById(id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(
    @Body(new AlbumsValidatePipe(AlbumsSchema)) createAlbumDto: AlbumsDto,
  ) {
    const album = await this.albumsService.create(createAlbumDto);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Body(new AlbumsValidatePipe(AlbumsSchema)) albumDto: AlbumsDto,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const album = await this.albumsService.updateOne(id, albumDto);
    if (album === undefined) {
      throw new NotFoundException();
    }
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const album = await this.albumsService.deleteAlbum(id);
    if (album !== undefined) {
      return album;
    }
    throw new NotFoundException();
  }
}

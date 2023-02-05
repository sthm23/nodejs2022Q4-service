import { AlbumsService } from './albums.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { AlbumsDto, AlbumsSchema } from './dto/albums.dto';
import { AlbumsValidatePipe } from './pipes/albumsValidate.pipe';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAlbums() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  gettrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = this.albumsService.getOneById(id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createtrack(
    @Body(new AlbumsValidatePipe(AlbumsSchema)) createtrackDto: AlbumsDto,
  ) {
    return this.albumsService.create(createtrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatetrack(
    @Body(new AlbumsValidatePipe(AlbumsSchema)) trackDto: AlbumsDto,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = this.albumsService.updateOne(id, trackDto);
    if (track === undefined) {
      throw new NotFoundException();
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletetrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    return this.albumsService.deleteAlbum(id);
  }
}

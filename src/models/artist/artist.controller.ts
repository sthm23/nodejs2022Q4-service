import { ArtistService } from './artist.service';
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
import { ArtistDto, ArtistSchema } from './dto/artist.dto';
import { ArtistValidatePipe } from './pipes/artistCreate.pipe';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getartists() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getartist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = this.artistsService.getOneById(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Post()
  @UsePipes(new ArtistValidatePipe(ArtistSchema))
  @HttpCode(HttpStatus.CREATED)
  createartist(@Body() createartistDto: ArtistDto) {
    return this.artistsService.create(createartistDto);
  }

  @Put(':id')
  @UsePipes(new ArtistValidatePipe(ArtistSchema))
  @HttpCode(HttpStatus.OK)
  updateartist(
    @Body() artistDto: ArtistDto,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = this.artistsService.updateOne(id, artistDto);
    if (artist === undefined) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteartist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    return this.artistsService.deleteArtist(id);
  }
}
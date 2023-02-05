import { TracksService } from './tracks.service';
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
import { TracksDto, TracksSchema } from './dto/tracks.dto';
import { TracksValidatePipe } from './pipes/tracksValidate.pipe';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  gettracks() {
    return this.tracksService.getAll();
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
    const track = this.tracksService.getOneById(id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createtrack(
    @Body(new TracksValidatePipe(TracksSchema)) createtrackDto: TracksDto,
  ) {
    return this.tracksService.create(createtrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updatetrack(
    @Body(new TracksValidatePipe(TracksSchema)) trackDto: TracksDto,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = this.tracksService.updateOne(id, trackDto);
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
    return this.tracksService.deleteArtist(id);
  }
}

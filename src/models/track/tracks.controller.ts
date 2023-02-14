import { TracksService } from './tracks.service';
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
import { TracksDto, TracksSchema } from './dto/tracks.dto';
import { TracksValidatePipe } from './pipes/tracksValidate.pipe';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async gettracks() {
    return await this.tracksService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async gettrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = await this.tracksService.getOneById(id);
    if (track) {
      return track;
    }
    throw new NotFoundException();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createtrack(
    @Body(new TracksValidatePipe(TracksSchema)) createtrackDto: TracksDto,
  ) {
    const track = await this.tracksService.create(createtrackDto);
    if (track === undefined) {
      throw new NotFoundException();
    }
    return track;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updatetrack(
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
    const track = await this.tracksService.updateOne(id, trackDto);
    if (track === undefined) {
      throw new NotFoundException();
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletetrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = await this.tracksService.deleteTrack(id);
    if (track === undefined) {
      throw new NotFoundException();
    }
    return track;
  }
}

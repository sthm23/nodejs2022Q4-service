import { UpdateUserDTO, updateUserSchema } from './dto/update-user.dto';
import { UsersService } from './users.service';
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
} from '@nestjs/common';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UserValidatePipe } from './pipes/userValidate.pipe';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return await this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.getOneById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(new UserValidatePipe(createUserSchema)) createUserDto: CreateUserDto,
  ) {
    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Body(new UserValidatePipe(updateUserSchema)) updateUserDto: UpdateUserDTO,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.updateOne(id, updateUserDto);
    if (user === undefined) {
      throw new NotFoundException();
    } else if (user === 'password') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.deleteUser(id);
    if (!user) {
      throw new NotFoundException();
    }
  }
}

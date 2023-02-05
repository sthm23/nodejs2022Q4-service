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
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UserValidatePipe } from './pipes/userCreate.pipe';
import { UserUpdValidatePipe } from './pipes/userUpdate.pipe';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = this.usersService.getOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  @UsePipes(new UserValidatePipe(createUserSchema))
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @UsePipes(new UserUpdValidatePipe(updateUserSchema))
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Body() updateUserDto: UpdateUserDTO,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const user = this.usersService.updateOne(id, updateUserDto);
    if (user === undefined) {
      throw new NotFoundException();
    } else if (user === 'password') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    return this.usersService.deleteUser(id);
  }
}

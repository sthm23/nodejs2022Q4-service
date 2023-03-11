import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfeces/users.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDTO } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { Inject } from '@nestjs/common/decorators';

@Injectable()
export class UsersService {
  constructor(@Inject(DbService) private db: DbService) {}

  getAll() {
    return this.db.users.map((el) => {
      const { password, ...res } = el;
      return res;
    });
  }

  getOneById(id: string) {
    const user = this.db.users
      .map(({ password, ...res }) => res)
      .find((el) => el.id === id);
    return user;
  }

  create(dto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    } as User;

    this.db.users.push(newUser);
    const { password, ...res } = newUser;
    return res;
  }

  updateOne(id: string, dto: UpdateUserDTO) {
    const user = this.db.users.find((el) => el.id === id);
    if (user === undefined) {
      return user;
    }
    const userIndex = this.db.users.findIndex((el) => el.id === id);
    if (user.password !== dto.oldPassword) {
      return 'password';
    }
    const updUser = {
      id: user.id,
      login: user.login,
      password: dto.newPassword,
      version: ++user.version,
      createdAt: user.createdAt,
      updatedAt: new Date().getTime(),
    } as User;

    this.db.users.splice(userIndex, 1, updUser);
    const { password, ...res } = updUser;
    return res;
  }

  deleteUser(id: string) {
    const user = this.db.users.find((el) => el.id === id);
    if (user == undefined) {
      return undefined;
    }
    const userIndex = this.db.users.findIndex((el) => el.id === id);
    this.db.users.splice(userIndex, 1);
    const { password, ...res } = user;
    return res;
  }
}

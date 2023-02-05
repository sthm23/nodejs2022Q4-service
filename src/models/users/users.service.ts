import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfeces/users.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll() {
    return this.users;
  }

  getOneById(id: string) {
    const user = this.users.find((el) => el.id === id);
    return user;
  }

  create(dto: CreateUserDto) {
    const newUser = { ...dto } as User;
    newUser.id = uuidv4();
    this.users.push(newUser);
    return newUser;
  }

  getUserIndex(id: string) {
    return this.users.findIndex((el) => el.id === id);
  }

  updateOne(id: string, dto: UpdateUserDTO) {
    const user = this.users.find((el) => el.id === id);
    if (user === undefined) {
      return user;
    }
    const userIndex = this.users.findIndex((el) => el.id === id);
    if (user.password !== dto.oldPassword) {
      return 'password';
    }
    const updUser = { ...user, ...dto } as User;
    this.users.splice(userIndex, 1, updUser);
    return updUser;
  }

  deleteUser(id: string) {
    const user = this.users.find((el) => el.id === id);
    const userIndex = this.users.findIndex((el) => el.id === id);
    this.users.splice(userIndex, 1);
    return user;
  }
}

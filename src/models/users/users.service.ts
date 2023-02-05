import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfeces/users.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  public users: User[] = [];

  getAll() {
    return this.users.map((el) => {
      const obj = { ...el };
      delete obj.password;
      return obj;
    });
  }

  getOneById(id: string) {
    const user = this.users
      .map((el) => {
        const obj = { ...el };
        delete obj.password;
        return obj;
      })
      .find((el) => el.id === id);
    return user;
  }

  create(dto: CreateUserDto) {
    const newUser = { ...dto } as User;
    newUser.id = uuidv4();
    this.users.push(newUser);
    delete newUser.password;
    return newUser;
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
    const updUser = { ...user, password: dto.newPassword } as User;
    this.users.splice(userIndex, 1, updUser);
    delete updUser.password;
    return updUser;
  }

  deleteUser(id: string) {
    const user = this.users.find((el) => el.id === id);
    const userIndex = this.users.findIndex((el) => el.id === id);
    this.users.splice(userIndex, 1);
    delete user.password;
    return user;
  }
}

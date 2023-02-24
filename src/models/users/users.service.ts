import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDTO } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { Inject } from '@nestjs/common/decorators';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DbService) private db: DbService
    ) {}

  async getAll() {
    return (await this.db.users.find()).map((el) => {
      const { password, ...res } = el;
      return res;
    });
  }

  async getOneById(id: string) {
    const user = (await this.db.users.findOneBy({ id }));
    if(!user) {
      return undefined
    }
    const {password, ...res} = user;
    return res;
  }

  async create(dto: CreateUserDto) {
    const now = Date.now().toString();
    const pas = bcrypt.hashSync(dto.password, 10);
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: pas,
      version: 1,
      createdAt: now,
      updatedAt: now,
    } as UsersEntity;

    const user = this.db.users.create(newUser);
    const userne = await this.db.users.save(user);
    const { password, ...res } = newUser;

    return {
      ...res,
      createdAt: +userne.createdAt,
      updatedAt: +userne.updatedAt,
    };
  }

  async updateOne(id: string, dto: UpdateUserDTO) {
    const user = await this.db.users.findOneBy({ id });
    if (!user) {
      return undefined;
    }

    const isValid = bcrypt.compareSync(dto.oldPassword, user.password);
    if (!isValid) {
      return 'password';
    }
    const updUser = {
      id: user.id,
      login: user.login,
      password: bcrypt.hashSync(dto.newPassword, 10),
      version: ++user.version,
      createdAt: user.createdAt,
      updatedAt: new Date().getTime().toString(),
    } as UsersEntity;
    const updedUser = await this.db.users.save(updUser);
    const { password, ...res } = updedUser;
    return {
      ...res,
      createdAt: +updedUser.createdAt,
      updatedAt: +updedUser.updatedAt,
    };

  }

  async deleteUser(id: string) {
    const user = await this.db.users.findOneBy({ id });
    if (!user) {
      return undefined;
    }
    await this.db.users.delete(id);
    return true
  }
}

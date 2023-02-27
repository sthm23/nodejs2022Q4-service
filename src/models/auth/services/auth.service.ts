import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { DbService } from "src/db/db.service";
import { AuthDto } from "../dto/login.dto";
import { PayloadData } from "../types/interfaceses";


@Injectable()
export class AuthService {
    constructor(
        private db: DbService,
        private jwtServ: JwtService
    ) {}

    async login(dto: AuthDto) {
        const user = await this.db.users.findOne({where: {login: dto.login}});
        if(!user) {
            throw new ForbiddenException()
        }
        const isValid = bcrypt.compareSync(dto.password, user.password);
        if(!isValid)throw new ForbiddenException()
        const tokens = await this.getToken(user.id, user.login);
        await this.refTokenChangeToHush(user.id, tokens.refreshToken);
        return tokens
    }

    async register(dto: AuthDto) {
        const now = Date.now().toString();
        const pas = bcrypt.hashSync(dto.password, 10);
        const newUserDto = {
          login: dto.login,
          password: pas,
          version: 1,
          createdAt: now,
          updatedAt: now,
          refToken: null
        };

        const user = this.db.users.create(newUserDto);
        const newUser = await this.db.users.save(user)
        return {
            id: newUser.id
        };
    }

    async refreshToken(body: {refreshToken:string}) {
        const payload: PayloadData = await this.jwtServ
        .verifyAsync(body.refreshToken, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        })
        .catch(() => {
            throw new ForbiddenException()
        });
        const user = await this.db.users.findOneBy({id: payload.userId});
        const checkToken = bcrypt.compareSync(body.refreshToken, user.refToken);
        if(!user && !checkToken) {
            throw new ForbiddenException()
        }
        const tokens = await this.getToken(user.id, user.login)
        await this.refTokenChangeToHush(user.id, tokens.refreshToken);
        return tokens
    }

    async getToken(id:string, login:string) {
        const [at, rt] = await Promise.all([
            this.jwtServ.sign({
                userId: id,
                login: login
            }, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: 60 * 10,
            }),
            this.jwtServ.sign({
                userId: id,
                login: login
            }, {
                secret: process.env.JWT_SECRET_REFRESH_KEY,
                expiresIn: 60 * 60 * 10,
            })
        ]);
        return {
            userId: id,
            accessToken: at,
            refreshToken: rt
        }
    }

    async refTokenChangeToHush(userId: string, refToken: string) {
        const hash = await bcrypt.hash(refToken, 10);
    
        await this.db.users.update(userId, {
          refToken: hash,
        });
    }
}
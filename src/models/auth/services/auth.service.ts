import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";


@Injectable()
export class AuthService {
    constructor(
        private db: DbService,
    ) {}

    async login() {

    }

    async register() {

    }

    async refreshToken() {

    }

    async getToken() {

    }


}
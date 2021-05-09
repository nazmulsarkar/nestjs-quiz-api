import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from '../users/users.service';
import { SignupAuthInput } from './dto/siignup-auth.input';
import { TokenAuthInput } from './dto/token-auth.input';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { LoginAuthInput } from './dto/login-auth.input';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(private usersService: UsersService, private jwtService: JwtService) { }


    async checkUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password, passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async createToken(jwtPayload: JwtPayload) {
        this.logger.log('create Token');
        // const { id, email, displayName, roles } = user;
        // const jwtPayload: JwtPayload = { id, email, displayName, roles };
        // const keyid = crypto.createHash('sha256').update(this.RSA_PUBLIC_KEY).digest('hex');

        const token = this.jwtService.sign(jwtPayload);
        return {
            token
        };
    }

    async validateUser(signedUser: JwtPayload): Promise<boolean> {
        this.logger.log('validate user:');
        this.logger.log(signedUser);
        if (signedUser && signedUser.email) {
            return Boolean(this.usersService.findOneBy(signedUser));
        }
        return false;
    }
}

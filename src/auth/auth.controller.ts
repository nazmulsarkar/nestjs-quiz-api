import { Body, Controller, Get, HttpStatus, Logger, Post, Request, Response, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/interfaces/user.interface';

@Controller('/api/auth')
export class AuthController {
    private logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @Post('login')
    async login(@Body() body: User, @Response() res: any): Promise<any> {
        this.logger.log('loginUser called');
        if (!(body && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
        }

        const user = await this.usersService.getUserByEmail(body.email);
        const { id, email, displayName, roles } = user;

        if (user) {
            if (await this.usersService.compareHash(body.password, user.passwordHash)) {
                return res.status(HttpStatus.OK).json(await this.authService.createToken({ id, email, displayName, roles }));
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or passwod wrong!' });
    }

    @Post('signup')
    async registerUser(@Response() res: any, @Body() body: User): Promise<any> {
        this.logger.log('register called');
        if (!(body && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
        }

        let user;
        try {
            user = await this.usersService.getUserByEmail(body.email);
        } catch (err) {
            this.logger.log('Error in lookup user');
        }

        if (user) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username already exists!' });
        } else {
            user = await this.usersService.create(body);
            if (user) {
                user.passwordHash = undefined;
            }
        }

        return res.status(HttpStatus.OK).json(await this.authService.createToken(user));
    }

    @Post('me')
    @UseGuards(AuthGuard('jwt'))
    async getUserMe(@Request() req: any, @Response() res: any): Promise<any> {
        const user = req.user;
        console.log(user);
        return res.status(HttpStatus.OK).json(user);
    }
}
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';
// import * as jwksRsa from 'jwks-rsa';
// import * as jwtDecode from 'jwt-decode';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger(JwtStrategy.name);

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
            // secretOrKeyProvider: (request, jwt, result) => {
            //     // @TODO move URL to a better location
            //     const client = jwksRsa({
            //         strictSsl: false,
            //         jwksUri: 'http://localhost:3000/.well-known/jwks.json',
            //         cache: true,
            //         jwksRequestsPerMinute: 2,
            //     });
            //     this.logger.log('decode received token');
            //     this.logger.log(jwt);
            //     const keyKid = 'kid';
            //     const kid = jwtDecode(jwt, { header: true })[keyKid];
            //     client.getSigningKey(kid, (err, key) => {
            //         if (err) {
            //             this.logger.log('Error happened in getSigningKey, could not find the public key');
            //             return result(null, null);
            //         }

            //         result(null, key.rsaPublicKey || key.publicKey);
            //     });
            // },
        });
        this.logger.log('constructor in JwtStrategy called');
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email, displayName: payload.displayName, roles: payload.roles };
    }
}
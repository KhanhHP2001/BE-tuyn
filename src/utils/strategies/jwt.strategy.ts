import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { jsonWebToken } from '../env-variables';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader("access_token"),
            ignoreExpiration: false,
            secretOrKey: jsonWebToken.secretKey,
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username, email: payload.email };
      }
}
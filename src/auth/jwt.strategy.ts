import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as assert from 'assert';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    assert(
      typeof process.env.JWT_SECRET === 'string',
      'JWT_SECRET is not defined',
    );
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // noinspection JSUnusedGlobalSymbols
  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username };
  }
}

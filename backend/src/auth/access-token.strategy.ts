import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { jwtConstants } from '@auth/constants';
import { User } from '@graphql/user/entities/user.entity';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: User) {
    const access_token = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!access_token) {
      throw new ForbiddenException();
    }

    return {
      ...payload,
      access_token,
    };
  }
}

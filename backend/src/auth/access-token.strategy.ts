import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { jwtConstants } from '@auth/constants';
import { User } from '@graphql/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.REFRESH_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  validate(req: Request, payload: User) {
    console.log('access-token.stst');
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

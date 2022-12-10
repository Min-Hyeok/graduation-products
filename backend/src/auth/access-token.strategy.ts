import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { jwtConstants } from '@auth/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(req: Request) {
    console.log('AccessTokenStrategy');
    const access_token = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!access_token) {
      throw new ForbiddenException();
    }

    return {
      access_token,
    };
  }
}

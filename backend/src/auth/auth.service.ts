import { Injectable } from '@nestjs/common';
import { User } from '@graphql/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@auth/constants';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getTokens(user: User): Promise<JwtToken> {
    const payload = {
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      id: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.ACCESS_TOKEN_SECRET,
        expiresIn: jwtConstants.ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.REFRESH_TOKEN_SECRET,
        expiresIn: jwtConstants.REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}

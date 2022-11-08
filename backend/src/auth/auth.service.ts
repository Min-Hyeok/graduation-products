import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { User } from '@graphql/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@auth/constants';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async generateTokens(user: User): Promise<JwtToken> {
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

  async hasRefreshToken(SSID: string) {
    const refreshToken = await this.cacheManager.get(SSID);
    console.log('refreshToken', refreshToken);
    return true;
  }
}

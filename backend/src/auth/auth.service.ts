import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@auth/constants';
import { Cache } from 'cache-manager';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async generateTokens(user: JwtTokenInfo): Promise<JwtToken> {
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
    const refreshToken: string = await this.cacheManager.get(SSID);

    if (!refreshToken) {
      throw new BadRequestException({
        message: '로그아웃 되었습니다. 로그인 후 다시 시도해주세요.',
      });
    }

    const verifyToken = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.REFRESH_TOKEN_SECRET,
    });

    if (!verifyToken) {
      throw new BadRequestException({
        message: '로그아웃 되었습니다. 로그인 후 다시 시도해주세요.',
      });
    }
    const decodeTokenParams: any = this.jwtService.decode(refreshToken);
    const { userName, phoneNumber, email, id } = decodeTokenParams;

    const { access_token } = await this.generateTokens({
      userName,
      phoneNumber,
      email,
      id,
    });

    return access_token;
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '@graphql/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User) {
    const payload = {
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

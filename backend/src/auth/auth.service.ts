import { Injectable } from '@nestjs/common';
import { UserService } from '@graphql/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@graphql/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(userId: string, password: string): Promise<User> {
    const findUser = await this.userService.findUser(userId);

    if (!findUser) {
      return null;
    }

    const isMatchedPassword = await bcrypt.compare(password, findUser.password);

    if (!isMatchedPassword) {
      return null;
    }

    delete findUser.password;

    return findUser;
  }
}

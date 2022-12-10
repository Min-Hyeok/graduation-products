import {
  BadRequestException,
  CACHE_MANAGER,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from '@graphql/user/dto/login-user.input';
import { AuthService } from '@auth/auth.service';
import { Cache } from 'cache-manager';
import { GraphQLError } from 'graphql';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  findUserAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async signUp(createUserInput: CreateUserInput): Promise<boolean> {
    const isRegisterUser = await this.findUser(createUserInput.userId);

    if (isRegisterUser) {
      throw new GraphQLError('중복된 아이디 입니다.', {
        extensions: { code: 200 },
      });
      // throw new ApolloError('중복된 아이디 입니다.', 'SUCCESS');
      // throw new BadRequestException({
      //   status: HttpStatus.BAD_REQUEST,
      //   message: '중복된 아이디 입니다.',
      // });
    }

    const encryptedPassword = await bcrypt.hash(
      createUserInput.password,
      saltRounds,
    );

    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          ...createUserInput,
          password: encryptedPassword,
          registerDate: new Date(),
          loginDate: new Date(),
        },
      ])
      .execute();

    return true;
  }

  async signIn(loginUserInput: LoginUserInput): Promise<JwtToken> {
    const userData = await this.findUser(loginUserInput.userId);

    if (!userData) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: '회원 정보를 찾을 수 없습니다.',
      });
    }

    const isMatchedPassword = await bcrypt.compare(
      loginUserInput.password,
      userData.password,
    );

    if (!isMatchedPassword) {
      throw new BadRequestException({
        message:
          '잘못된 비밀번호입니다. 다시 시도하거나 비밀번호 찾기를 클릭하여 재설정하세요.',
      });
    }

    const { access_token, refresh_token }: JwtToken =
      await this.authService.generateTokens(userData);

    const SSID = Math.random().toString(36).substring(2, 13);
    await this.cacheManager.set(SSID, refresh_token, 1000 * 60 * 525600);

    return {
      access_token,
      SSID,
    };
  }

  async findUser(userId: string): Promise<User> {
    return await this.userRepository.findOneBy({
      userId,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async signUp(createUserInput: CreateUserInput): Promise<UpdateUserInput> {
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

    return {
      message: '성공',
      success: true,
      error: false,
    };
  }
}

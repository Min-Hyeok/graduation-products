import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from '@graphql/user/dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findUserAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async signUp(createUserInput: CreateUserInput): Promise<UpdateUserInput> {
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([createUserInput])
      .execute();

    return {
      message: '성공',
      success: true,
      error: false,
    };
  }
}

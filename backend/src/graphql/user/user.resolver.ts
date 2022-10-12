import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from '@graphql/user/dto/create-user.input';
import { LoginUserInput } from '@graphql/user/dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@auth/access-token.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => [User], { name: 'findUserAll' })
  findUserAll() {
    return this.userService.findUserAll();
  }

  @Mutation(() => User)
  async signUp(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<boolean> {
    return await this.userService.signUp(createUserInput);
  }

  @Mutation(() => User)
  async signIn(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<JwtToken> {
    return await this.userService.signIn(loginUserInput);
  }

  // @Query(() => [User], { name: 'token' })
  // async getToken: Promise<JwtToken> {
  //   return await
  // }
}

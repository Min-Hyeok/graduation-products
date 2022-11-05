import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from '@graphql/user/dto/create-user.input';
import { LoginUserInput } from '@graphql/user/dto/login-user.input';
import { Res, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@auth/access-token.guard';
import { Response } from 'express';

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
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    const { access_token } = await this.userService.signIn(loginUserInput);
    console.log(response.cookie);
    // res.res.cookie('token', access_token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 1000 * 60 * 10,
    // });

    return { status: true };
  }

  // @Query(() => [User], { name: 'token' })
  // async getToken: Promise<JwtToken> {
  //   return await
  // }
}

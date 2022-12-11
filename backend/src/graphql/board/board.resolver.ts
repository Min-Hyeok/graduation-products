import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@auth/access-token.guard';
import { ExpressContext } from 'apollo-server-express';
import { AuthService } from '@auth/auth.service';

@Resolver(() => Board)
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Mutation(() => Board)
  createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
    @Context() context: ExpressContext,
  ) {
    const token = context.req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    const tokenInfo = this.authService.getTokenInfo(token);
    return this.boardService.create(createBoardInput, <JwtTokenInfo>tokenInfo);
  }

  @Query(() => [Board], { name: 'findBoardAll' })
  findAll(
    @Args('page', { type: () => Int }) page: number,
    @Args('search', { type: () => String }) search: string,
  ) {
    return this.boardService.findAll(page, search);
  }

  @Query(() => Board, { name: 'board' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.boardService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => Board)
  updateBoard(@Args('updateBoardInput') updateBoardInput: UpdateBoardInput) {
    return this.boardService.update(updateBoardInput.id, updateBoardInput);
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => Board)
  removeBoard(@Args('id', { type: () => Int }) id: number) {
    return this.boardService.remove(id);
  }
}

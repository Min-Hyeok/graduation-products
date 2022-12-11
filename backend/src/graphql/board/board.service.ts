import { Injectable } from '@nestjs/common';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from '@graphql/board/entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(
    createBoardInput: CreateBoardInput,
    { userName, id }: JwtTokenInfo,
  ) {
    const response = await this.boardRepository
      .createQueryBuilder()
      .insert()
      .into(Board)
      .values([
        {
          ...createBoardInput,
          writer: userName,
          userIndex: id,
          registerDate: new Date(),
        },
      ])
      .execute();

    return response.identifiers.pop();
  }

  async findAll(page, search) {
    const splitPage = 40;
    const pageNumber = Math.ceil(page / splitPage);
    const response = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.id > :min', { min: pageNumber })
      .andWhere('board.id < :max', { max: pageNumber + splitPage })
      .andWhere('board.subject like :search', { search: `%${search}%` })
      .getMany();

    return response;
  }

  async findOne(id: number) {
    const response = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.id = :id', { id })
      .getOne();

    return response;
  }

  update(id: number, updateBoardInput: UpdateBoardInput) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}

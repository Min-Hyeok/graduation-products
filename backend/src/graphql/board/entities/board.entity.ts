import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Board {
  @Field(() => Int, { description: '게시글 고유 번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: '회원 고유 번호' })
  @Column()
  userIndex: number;

  @Field(() => String, { description: '작성자' })
  @Column({ length: 255 })
  writer: string;

  @Field(() => String, { description: '글 제목' })
  @Column({ length: 50 })
  subject: string;

  @Field(() => String, { description: '글 내용' })
  @Column({ type: 'text' })
  content: string;

  @Field(() => Date, { description: '작성일' })
  @CreateDateColumn()
  registerDate: Date;

  @Field(() => String, { description: '게시글 썸네일 이미지' })
  @Column({ type: 'text' })
  somnail: string;
}

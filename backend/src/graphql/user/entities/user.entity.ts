import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int, { description: '회원 고유 번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: '회원 아이디(이메일)' })
  @Column({ length: 100 })
  userId: string;

  @Field(() => String, { description: '회원 비밀번호' })
  @Column({ length: 255 })
  password: string;

  @Field(() => String, { description: '회원 이름 (닉네임)' })
  @Column({ length: 12 })
  userName: string;

  @Field(() => String, { description: '회원 전화번호' })
  @Column({ length: 20 })
  phoneNumber: string;

  @Field(() => Date, { description: '회원가입일' })
  @CreateDateColumn()
  registerDate: Date;

  @Field(() => Date, { description: '마지막으로 로그인 한 날짜' })
  @CreateDateColumn()
  loginDate: Date;

  @Field(() => String, { description: 'access token' })
  access_token: string;
}

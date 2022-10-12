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

  @Field(() => String, { description: '회원 ID' })
  @Column({ length: 20 })
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

  @Field(() => String, { description: '회원 이메일 주소' })
  @Column({ length: 50 })
  email: string;

  @Field(() => Date, { description: '회원가입일' })
  @CreateDateColumn()
  registerDate: Date;

  @Field(() => Date, { description: '마지막으로 로그인 한 날짜' })
  @CreateDateColumn()
  loginDate: Date;

  @Field(() => String, { description: '엑세스 토큰' })
  access_token: string;
}

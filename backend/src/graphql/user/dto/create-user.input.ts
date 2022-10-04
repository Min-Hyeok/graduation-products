import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: '아이디' })
  @IsNotEmpty()
  userId: string;

  @Field(() => String, { description: '비밀번호' })
  @IsNotEmpty()
  password: string;

  @Field(() => String, { description: '이름(닉네임)' })
  @IsNotEmpty()
  userName: string;

  @Field(() => String, { description: '휴대전화 번호' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @Field(() => String, { description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateBoardInput {
  @Field(() => String, { description: '글제목' })
  @IsNotEmpty({ message: '제목을 입력해 주세요.' })
  @Length(5, 50, {
    message: '제목은 5글자 이상 50글자 미만으로 입력해야 합니다.',
  })
  subject: string;

  @Field(() => String, { description: '글제목' })
  @IsNotEmpty({ message: '게시글 내용을 입력해주세요.' })
  content: string;

  @Field(() => String, { description: '썸네일 이미지' })
  somnail: string;
}

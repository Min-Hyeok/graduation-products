import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateBoardInput {
  @Field(() => String, { description: '글제목' })
  @IsNotEmpty({ message: '제목을 입력해 주세요.' })
  @Length(5, 50, {
    message: '제목은 5글자 이상 50글자 미만으로 입력해야 합니다.',
  })
  subject: string;

  @Field(() => String, { description: '반려동물 품종' })
  @IsNotEmpty({ message: '품종을 입력해 주세요.' })
  @Length(2, 50, {
    message: '품종은 2 글자 이상 50글자 미만으로 입력해야 합니다.',
  })
  breeds: string;

  @Field(() => Int, { description: '반려동물 나이' })
  @IsNotEmpty({ message: '반려동물의 나이를 입력해주세요.' })
  age: number;

  @Field(() => Int, { description: '판매가격' })
  @IsNotEmpty({ message: '가격을 입력해 주세요.' })
  price: number;

  @Field(() => String, { description: '글제목' })
  @IsNotEmpty({ message: '게시글 내용을 입력해주세요.' })
  content: string;

  @Field(() => String, { description: '썸네일 이미지' })
  @IsNotEmpty({ message: '이미지를 한 장 이상 업로드 해주세요.' })
  somnail: string;
}

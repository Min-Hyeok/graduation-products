import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: '아이디' })
  @IsNotEmpty({ message: '아이디는 필수입력 값입니다.' })
  userId = '';

  @Field(() => String, { description: '비밀번호' })
  @IsNotEmpty({ message: '비밀번호는 필수입력 값입니다.' })
  password = '';

  @Field(() => String, { description: '세션 ID' })
  SSID = '';
}

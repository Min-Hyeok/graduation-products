import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: '이메일' })
  @IsNotEmpty({ message: '이메일 주소는 필수입력 값입니다.' })
  @IsEmail({}, { message: '이메일 주소 양식이 올바르지 않습니다.' })
  @Length(5, 50, { message: '이메일 주소 길이가 올바르지 않습니다.' })
  userId = '';

  @Field(() => String, { description: '비밀번호' })
  @IsNotEmpty({ message: '비밀번호는 필수입력 값입니다.' })
  @Length(8, 30, {
    message: '비밀번호는 최소 8글자 이상 30글자 미만으로 입력해야 합니다.',
  })
  password = '';

  @Field(() => String, { description: '이름(닉네임)' })
  @IsNotEmpty({ message: '이름(닉네임)은 필수입력 값입니다.' })
  @Length(1, 12, {
    message: '이름은 1글자 이상 12글자 미만으로 입력해야 합니다.',
  })
  userName = '';

  @Field(() => String, { description: '휴대전화 번호' })
  @IsNotEmpty({ message: '전화번호는 필수입력 값입니다.' })
  @IsPhoneNumber('KR', { message: '전화번호 양식이 올바르지 않습니다.' })
  @Length(8, 20, { message: '전화번호 길이가 잘못되었습니다.' })
  phoneNumber = '';
}

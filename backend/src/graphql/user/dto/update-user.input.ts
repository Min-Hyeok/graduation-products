import { CreateUserInput } from './create-user.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { description: 'api 호출 이후 안내 메세지' })
  message: string;

  @Field(() => Boolean, { description: 'api 호출 성공여부' })
  success: boolean;

  @Field(() => Boolean, { description: 'api 호출 실패여부' })
  error: boolean;
}

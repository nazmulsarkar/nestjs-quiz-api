import { LoginAuthInput } from './login-auth.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class SignupAuthInput extends PartialType(LoginAuthInput) {
  @Field(() => ID)
  id?: string;
  @Field()
  readonly email?: string;
  @Field()
  readonly password?: string;
  @Field(() => [String])
  readonly roles?: string[];
  @Field()
  readonly displayName?: string;
}

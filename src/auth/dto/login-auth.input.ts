import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}

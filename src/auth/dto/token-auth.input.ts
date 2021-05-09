import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TokenAuthInput {
  @Field()
  readonly status: number;
  @Field()
  readonly refreshToken?: string;
  @Field()
  readonly accessToken: string;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  @Field()
  name: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  avatarUrl: string;

  accessId: string;
}

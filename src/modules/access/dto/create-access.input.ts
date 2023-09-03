import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccessInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

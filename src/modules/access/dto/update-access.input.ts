import { CreateAccessInput } from './create-access.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccessInput extends PartialType(CreateAccessInput) {
  @Field(() => Int)
  id: number;
}

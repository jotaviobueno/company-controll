import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class IdInput {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

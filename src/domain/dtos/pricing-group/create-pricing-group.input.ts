import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePricingGroupInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}

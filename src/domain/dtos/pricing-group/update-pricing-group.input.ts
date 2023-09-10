import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreatePricingGroupInput } from './create-pricing-group.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePricingGroupInput extends PartialType(
  CreatePricingGroupInput,
) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}

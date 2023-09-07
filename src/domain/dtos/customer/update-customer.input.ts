import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateCustomerInput } from './create-customer.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}

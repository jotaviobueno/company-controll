import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateAddressInput } from '../address';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerAddressInput extends PartialType(
  CreateAddressInput,
) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}

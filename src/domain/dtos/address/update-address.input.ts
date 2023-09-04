import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateAddressInput } from './create-address.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}

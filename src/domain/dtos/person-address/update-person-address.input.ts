import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAddressInput } from '../address';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePersonAddressInput extends PartialType(CreateAddressInput) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}

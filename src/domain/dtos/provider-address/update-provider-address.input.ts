import { IsMongoId, IsNotEmpty } from 'class-validator';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateAddressInput } from '../address';

@InputType()
export class UpdateProviderAddressInput extends PartialType(
  CreateAddressInput,
) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}

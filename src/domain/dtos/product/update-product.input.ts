import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateProductInput } from './create-product.input';
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends OmitType(
  PartialType(CreateProductInput),
  ['companyId'],
) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}

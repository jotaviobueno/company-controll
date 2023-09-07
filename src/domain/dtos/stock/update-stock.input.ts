import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateStockInput } from './create-stock.input';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateStockInput extends PartialType(CreateStockInput) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}

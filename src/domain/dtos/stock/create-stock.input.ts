import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { STOCK_TYPE_STATUS } from 'src/domain/enums';

@InputType()
export class CreateStockInput {
  @Field(() => STOCK_TYPE_STATUS)
  @IsString()
  @IsNotEmpty()
  type: STOCK_TYPE_STATUS;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  provider?: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  productId: string;
}

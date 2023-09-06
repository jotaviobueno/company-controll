import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsDecimal,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsDecimal()
  @IsNotEmpty()
  unitPrice: number;

  @Field(() => Int)
  @IsDecimal()
  @IsOptional()
  discountPercentage?: number;

  @Field(() => [String])
  @IsString({ each: true })
  @IsNotEmpty()
  imagesUrl: string[];

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;
}

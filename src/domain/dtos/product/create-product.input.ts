import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { IsCents } from 'src/domain/validators/is-cents';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsCents()
  @IsNotEmpty()
  unitPrice: number;

  @Field(() => Int, { nullable: true })
  @Min(0)
  @Max(99)
  @IsNumber()
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

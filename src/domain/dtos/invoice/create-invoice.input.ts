import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { INVOICE_PAYMENT_TYPE, INVOICE_STATUS } from 'src/domain/enums/invoice';

@InputType()
export class CreateInvoiceInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  operation?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => INVOICE_PAYMENT_TYPE)
  @IsString()
  @IsNotEmpty()
  paymentType: INVOICE_PAYMENT_TYPE;

  @Field(() => INVOICE_STATUS, { nullable: true })
  @IsString()
  @IsOptional()
  status?: INVOICE_STATUS;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  unitPrice?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  totalAfterInstallment?: number;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(12)
  @IsNumber()
  @IsOptional()
  totalInstallments?: number;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(9999)
  @IsNumber()
  @IsOptional()
  lastInstallment?: number;

  @Field(() => Int, { nullable: true })
  @Min(0)
  @Max(99)
  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  discountMoney?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  priceBeforeDiscount?: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  finalPrice: number;

  @Field(() => [String], { nullable: true })
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  personsIds?: string[];

  @Field(() => [String], { nullable: true })
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  customersIds?: string[];

  @Field(() => [String], { nullable: true })
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  companiesIds?: string[];

  @Field(() => [String], { nullable: true })
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  productsIds?: string[];

  @Field(() => [String], { nullable: true })
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  pricingGroupsId?: string[];
}

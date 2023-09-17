import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FinanceStatus, Invoice, PaymentType } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class InvoiceEntity extends IBaseEntity implements Invoice {
  @Field({ nullable: true })
  operation: string | null;

  @Field({ nullable: true })
  description: string | null;

  @Field({ nullable: true })
  paymentType: PaymentType;

  @Field({ nullable: true })
  status: FinanceStatus | null;

  @Field(() => Int, { nullable: true })
  quantity: number | null;

  @Field(() => Int, { nullable: true })
  unitPrice: number | null;

  @Field(() => Int, { nullable: true })
  totalAfterInstallment: number | null;

  @Field(() => Int, { nullable: true })
  totalInstallments: number | null;

  @Field(() => Int, { nullable: true })
  lastInstallment: number | null;

  @Field(() => Int, { nullable: true })
  discountPercentage: number | null;

  @Field(() => Int, { nullable: true })
  discountMoney: number | null;

  @Field(() => Int, { nullable: true })
  priceBeforeDiscount: number | null;

  @Field(() => Int)
  finalPrice: number;

  deletedAt: Date | null;
}

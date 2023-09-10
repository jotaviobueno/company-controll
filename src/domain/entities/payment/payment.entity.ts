import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Payment } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import GraphQLJSON from 'graphql-type-json';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class PaymentEntity extends IBaseEntity implements Payment {
  @Field()
  status: string;

  @Field()
  statusDetail: string;

  @Field()
  operationType: string;

  @Field()
  paymentId: string;

  @Field()
  brand: string;

  @Field()
  method: string;

  @Field({ nullable: true })
  cardFirstSixDigits: string | null;

  @Field({ nullable: true })
  cardLastFourDigits: string | null;

  @Field()
  currency: string;

  @Field(() => [GraphQLJSON])
  fees: JsonValue[];

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  installmentAmount: number;

  @Field(() => Int)
  totalPaidWithFees: number;

  @Field()
  invoiceId: string;

  @Field(() => Date, { nullable: true })
  approvedAt: Date | null;
}

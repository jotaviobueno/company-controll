import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Stock, StockTypeStatus } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class StockEntity extends IBaseEntity implements Stock {
  @Field()
  type: StockTypeStatus;

  @Field({ nullable: true })
  description: string | null;

  @Field({ nullable: true })
  provider: string | null;

  @Field(() => Int)
  quantity: number;

  productId: string;
}

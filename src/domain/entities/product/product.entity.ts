import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class ProductEntity extends IBaseEntity implements Product {
  @Field()
  name: string;

  @Field()
  unitPrice: number;

  @Field({ nullable: true })
  discountPercentage: number | null;

  @Field(() => [String])
  imagesUrl: string[];

  companyId: string;

  deletedAt: Date | null;
}

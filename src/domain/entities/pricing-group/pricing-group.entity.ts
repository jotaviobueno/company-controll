import { Field, ObjectType } from '@nestjs/graphql';
import { PricingGroup } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class PricingGroupEntity extends IBaseEntity implements PricingGroup {
  @Field()
  name: string;

  deletedAt: Date | null;
}

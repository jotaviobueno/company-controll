import { ObjectType } from '@nestjs/graphql';
import { InvoicePricingGroup } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class InvoicePricingGroupEntity
  extends IBaseEntity
  implements InvoicePricingGroup
{
  invoiceId: string;

  pricingGroupId: string;

  deletedAt: Date | null;
}

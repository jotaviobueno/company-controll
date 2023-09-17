import { ObjectType } from '@nestjs/graphql';
import { InvoiceProduct } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class InvoiceProductEntity
  extends IBaseEntity
  implements InvoiceProduct
{
  invoiceId: string;

  productId: string;

  deletedAt: Date | null;
}

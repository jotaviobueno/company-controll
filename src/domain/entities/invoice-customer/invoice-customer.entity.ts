import { ObjectType } from '@nestjs/graphql';
import { InvoiceCustomer } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class InvoiceCustomerEntity
  extends IBaseEntity
  implements InvoiceCustomer
{
  invoiceId: string;

  customerId: string;

  deletedAt: Date | null;
}

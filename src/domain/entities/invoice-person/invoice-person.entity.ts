import { ObjectType } from '@nestjs/graphql';
import { InvoicePerson } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class InvoicePersonEntity extends IBaseEntity implements InvoicePerson {
  personId: string;

  invoiceId: string;

  deletedAt: Date | null;
}

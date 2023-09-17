import { ObjectType } from '@nestjs/graphql';
import { InvoiceProvider } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export class InvoiceProviderEntity
  extends IBaseEntity
  implements InvoiceProvider
{
  invoiceId: string;

  providerId: string;

  deletedAt: Date | null;
}

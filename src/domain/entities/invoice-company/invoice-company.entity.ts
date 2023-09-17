import { ObjectType } from '@nestjs/graphql';
import { InvoiceCompany } from '@prisma/client';
import { IBaseEntity } from 'src/domain/base';

@ObjectType()
export abstract class InvoiceCompanyEntity
  extends IBaseEntity
  implements InvoiceCompany
{
  invoiceId: string;

  companyId: string;

  deletedAt: Date | null;
}

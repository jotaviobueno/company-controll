import { Injectable } from '@nestjs/common';
import { IInvoiceCompanyRepository } from './iinvoice-company.repository';
import { InvoiceCompanyEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

@Injectable()
export class InvoiceCompanyRepository
  extends RepositoryFactory<InvoiceCompanyEntity>
  implements IInvoiceCompanyRepository
{
  constructor() {
    super('invoiceCompany');
  }

  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceCompanyEntity[]> {
    return this.prismaService.invoiceCompany.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}

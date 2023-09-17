import { Injectable } from '@nestjs/common';
import { IInvoiceProductRepository } from './iinvoice-product.repository';
import { InvoiceProductEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

@Injectable()
export class InvoiceProductRepository extends IInvoiceProductRepository {
  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoiceProductEntity[]> {
    return this.prismaService.invoiceProduct.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}

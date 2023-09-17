import { Injectable } from '@nestjs/common';
import { IInvoicePricingGroupRepository } from './iinvoice-pricing-group.repository';
import { InvoicePricingGroupEntity } from 'src/domain/entities';

@Injectable()
export class InvoicePricingGroupRepository extends IInvoicePricingGroupRepository {
  findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoicePricingGroupEntity[]> {
    return this.prismaService.invoicePricingGroup.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}

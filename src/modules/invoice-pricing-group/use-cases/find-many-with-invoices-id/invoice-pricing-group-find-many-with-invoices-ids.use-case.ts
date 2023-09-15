import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { InvoicePricingGroupEntity } from 'src/domain/entities';
import { IInvoicePricingGroupRepository } from 'src/repositories/invoice-pricing-group';

@Injectable()
export class InvoicePricingGroupFindManyWithInvoicesIds
  implements IBaseUseCase<string[], InvoicePricingGroupEntity[]>
{
  constructor(
    private readonly invoicePricingGroupRepository: IInvoicePricingGroupRepository,
  ) {}

  execute(data: string[]): Promise<InvoicePricingGroupEntity[]> {
    return this.invoicePricingGroupRepository.findManyWithInvoicesIds(data);
  }
}

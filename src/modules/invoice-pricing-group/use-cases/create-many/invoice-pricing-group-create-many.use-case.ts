import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoicePricingGroupDto } from 'src/domain/dtos';
import { IInvoicePricingGroupRepository } from 'src/repositories/invoice-pricing-group';

@Injectable()
export class InvoicePricingGroupCreateManyUseCase
  implements IBaseUseCase<CreateInvoicePricingGroupDto[], void>
{
  constructor(
    private readonly invoicePricingGroupRepository: IInvoicePricingGroupRepository,
  ) {}

  execute(data: CreateInvoicePricingGroupDto[]): Promise<void> {
    return this.invoicePricingGroupRepository.createMany(data);
  }
}

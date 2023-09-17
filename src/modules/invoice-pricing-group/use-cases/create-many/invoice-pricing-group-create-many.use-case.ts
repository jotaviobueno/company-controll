import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateInvoicePricingGroupDto } from 'src/domain/dtos';
import { CreateManyEntity } from 'src/domain/entities';
import { IInvoicePricingGroupRepository } from 'src/repositories/invoice-pricing-group';

@Injectable()
export class InvoicePricingGroupCreateManyUseCase
  implements IBaseUseCase<CreateInvoicePricingGroupDto[], CreateManyEntity>
{
  constructor(
    private readonly invoicePricingGroupRepository: IInvoicePricingGroupRepository,
  ) {}

  execute(data: CreateInvoicePricingGroupDto[]): Promise<CreateManyEntity> {
    return this.invoicePricingGroupRepository.createMany(data);
  }
}

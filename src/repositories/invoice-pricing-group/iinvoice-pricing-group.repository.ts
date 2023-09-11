import { IBaseRepository } from 'src/domain/base';
import { CreateInvoicePricingGroupDto } from 'src/domain/dtos';
import { InvoicePricingGroupEntity } from 'src/domain/entities';

export abstract class IInvoicePricingGroupRepository extends IBaseRepository<
  CreateInvoicePricingGroupDto,
  InvoicePricingGroupEntity
> {
  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<InvoicePricingGroupEntity[]>;
}

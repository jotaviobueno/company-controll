import { Module } from '@nestjs/common';
import {
  IInvoicePricingGroupRepository,
  InvoicePricingGroupRepository,
} from 'src/repositories/invoice-pricing-group';
import {
  InvoicePricingGroupCreateManyUseCase,
  InvoicePricingGroupFindManyWithInvoicesIds,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';

export const invoicePricingGroupModuleMock = {
  imports: [PrismaModule],
  providers: [
    {
      provide: IInvoicePricingGroupRepository,
      useClass: InvoicePricingGroupRepository,
    },
    InvoicePricingGroupCreateManyUseCase,
    InvoicePricingGroupFindManyWithInvoicesIds,
  ],
  exports: [
    InvoicePricingGroupFindManyWithInvoicesIds,
    InvoicePricingGroupCreateManyUseCase,
  ],
};

@Module(invoicePricingGroupModuleMock)
export class InvoicePricingGroupModule {}

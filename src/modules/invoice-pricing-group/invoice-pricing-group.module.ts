import { Module } from '@nestjs/common';
import {
  IInvoicePricingGroupRepository,
  InvoicePricingGroupRepository,
} from 'src/repositories/invoice-pricing-group';
import { InvoicePricingGroupCreateManyUseCase } from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';

export const invoicePricingGroupModuleMock = {
  imports: [PrismaModule],
  providers: [
    {
      provide: IInvoicePricingGroupRepository,
      useClass: InvoicePricingGroupRepository,
    },
    InvoicePricingGroupCreateManyUseCase,
  ],
};

@Module(invoicePricingGroupModuleMock)
export class InvoicePricingGroupModule {}

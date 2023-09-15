import { CreateInvoicePricingGroupDto } from 'src/domain/dtos';
import { InvoicePricingGroupEntity } from 'src/domain/entities';

export const createInvoicePricingGroupDtoMock: CreateInvoicePricingGroupDto = {
  invoiceId: '1',
  pricingGroupId: '1',
};

export const invoicePricingGroupMock: InvoicePricingGroupEntity = {
  invoiceId: '1',
  pricingGroupId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

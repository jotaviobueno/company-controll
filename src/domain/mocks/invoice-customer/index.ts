import { CreateInvoiceCustomerDto } from 'src/domain/dtos';
import { InvoiceCustomerEntity } from 'src/domain/entities';

export const invoiceCustomerMock: InvoiceCustomerEntity = {
  invoiceId: '1',
  customerId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createInvoiceCustomerDtoMock: CreateInvoiceCustomerDto = {
  invoiceId: '1',
  customerId: '1',
};

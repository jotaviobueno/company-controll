import { CreateInvoiceProviderInput } from 'src/domain/dtos';
import { InvoiceProviderEntity } from 'src/domain/entities';

export const invoiceProviderMock: InvoiceProviderEntity = {
  invoiceId: '1',
  providerId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createInvoiceProviderInputMock: CreateInvoiceProviderInput = {
  invoiceId: '1',
  providerId: '1',
};

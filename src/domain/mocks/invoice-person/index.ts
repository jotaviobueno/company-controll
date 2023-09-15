import { CreateInvoicePersonDto } from 'src/domain/dtos';
import { InvoicePersonEntity } from 'src/domain/entities';

export const createInvoicePersonDtoMock: CreateInvoicePersonDto = {
  personId: '1',
  invoiceId: '1',
};

export const invoicePersonMock: InvoicePersonEntity = {
  personId: '1',
  invoiceId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

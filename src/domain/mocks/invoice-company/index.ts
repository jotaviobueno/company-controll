import { CreateInvoiceCompanyDto } from 'src/domain/dtos';
import { InvoiceCompanyEntity } from 'src/domain/entities';

export const createInvoiceCompanyDtoMock: CreateInvoiceCompanyDto = {
  invoiceId: '1',
  companyId: '1',
};

export const invoiceCompanyMock: InvoiceCompanyEntity = {
  invoiceId: '1',
  companyId: '1',
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

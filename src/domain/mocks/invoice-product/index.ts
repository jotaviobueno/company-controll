import { CreateInvoiceProductDto } from 'src/domain/dtos';
import { InvoiceProductEntity } from 'src/domain/entities';

export const createInvoiceProductDtoMock: CreateInvoiceProductDto = {
  invoiceId: '1',
  productId: '1',
};

export const invoiceProductMock: InvoiceProductEntity = {
  id: '1',
  invoiceId: '1',
  productId: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

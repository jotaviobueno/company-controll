import { CreateInvoiceInput } from 'src/domain/dtos';
import { InvoiceEntity } from 'src/domain/entities';
import { INVOICE_PAYMENT_TYPE } from 'src/domain/enums';
import { InvoiceCalculatorModel } from 'src/domain/models';

export const invoiceCalculatorModelMock: InvoiceCalculatorModel = {
  finalPrice: 100,
  discountMoney: 100,
  priceBeforeDiscount: 100,
  totalInstallments: 100,
  lastInstallment: 100,
  totalAfterInstallment: 100,
};

export const invoiceMock: InvoiceEntity = {
  operation: 'test',
  description: 'test',
  paymentType: 'INCOME',
  status: 'OPEN',
  quantity: 100,
  unitPrice: 100,
  totalAfterInstallment: 100,
  totalInstallments: 100,
  lastInstallment: 100,
  discountPercentage: 100,
  discountMoney: 100,
  priceBeforeDiscount: 100,
  finalPrice: 100,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createInvoiceInputMock: CreateInvoiceInput = {
  paymentType: INVOICE_PAYMENT_TYPE.INCOME,
  finalPrice: 100,
};

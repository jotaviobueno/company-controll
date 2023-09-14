import { JsonValue } from '@prisma/client/runtime/library';
import { CreatePaymentDto } from 'src/domain/dtos';
import { PaymentEntity } from 'src/domain/entities';

export const paymentMock: PaymentEntity = {
  status: 'test',
  statusDetail: 'test',
  operationType: 'test',
  paymentId: 'test',
  brand: 'test',
  method: 'test',
  cardFirstSixDigits: 'test',
  cardLastFourDigits: 'test',
  currency: 'test',
  fees: [] as JsonValue[],
  amount: 100,
  installmentAmount: 100,
  totalPaidWithFees: 100,
  invoiceId: '1',
  approvedAt: null,
  id: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

export const createPaymentDtoMock: CreatePaymentDto = {
  status: 'test',
  statusDetail: 'test',
  operationType: 'test',
  paymentId: '1',
  brand: 'test',
  method: 'test',
  cardFirstSixDigits: 'test',
  cardLastFourDigits: 'test',
  currency: 'test',
  fees: [] as JsonValue[],
  amount: 100,
  installmentAmount: 100,
  totalPaidWithFees: 100,
  invoiceId: '1',
  approvedAt: null,
};

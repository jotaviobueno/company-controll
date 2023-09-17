import { CreatePaymentNotificationDto } from 'src/domain/dtos';

export const createPaymentNotificationDtoMock: CreatePaymentNotificationDto = {
  id: '1',
  resource: 'test',
  action: 'test',
  topic: 'test',
  apiVersion: 'test',
  transferId: 'test',
  genericId: '1',
  paymentId: 'test',
  mercadoPagoUserId: 'test',
  liveMode: true,
  type: 'test',
};

import { PaymentNotificationEntity } from 'src/domain/entities';

export const paymentNotificationMock: PaymentNotificationEntity = {
  id: '1',
  resource: 'test',
  action: 'test',
  topic: 'test',
  apiVersion: 'test',
  transferId: 'test',
  genericId: '1',
  paymentId: 'test',
  mercadoPagoUserId: 'test',
  liveMode: true,
  type: 'test',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  deletedAt: null,
};

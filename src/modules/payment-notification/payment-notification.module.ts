import { Module } from '@nestjs/common';
import {
  IPaymentNotificationRepository,
  PaymentNotificationRepository,
} from 'src/repositories/payment-notification';
import {
  PaymentNotificationCreateUseCase,
  PaymentNotificationFindByPaymentIdUseCase,
} from './use-cases';

export const mercadoPagoModuleMock = {
  providers: [
    {
      provide: IPaymentNotificationRepository,
      useClass: PaymentNotificationRepository,
    },
    PaymentNotificationCreateUseCase,
    PaymentNotificationFindByPaymentIdUseCase,
  ],
  exports: [
    PaymentNotificationCreateUseCase,
    PaymentNotificationFindByPaymentIdUseCase,
  ],
};

@Module(mercadoPagoModuleMock)
export class PaymentNotificationModule {}

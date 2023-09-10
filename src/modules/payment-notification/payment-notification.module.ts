import { Module } from '@nestjs/common';
import {
  IPaymentNotificationRepository,
  PaymentNotificationRepository,
} from 'src/repositories/payment-notification';
import {
  PaymentNotificationCreateUseCase,
  PaymentNotificationFindByPaymentIdUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';

export const paymentNotificationModuleMock = {
  imports: [PrismaModule],
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

@Module(paymentNotificationModuleMock)
export class PaymentNotificationModule {}

import { Module } from '@nestjs/common';
import {
  IPaymentRepository,
  PaymentRepository,
} from 'src/repositories/payment';
import {
  PaymentCreateUseCase,
  PaymentFindByPaymentIdUseCase,
  PaymentFindManyWithInvoicesIdsUseCase,
} from './use-cases';
import { PrismaModule } from 'src/db/prisma.module';

export const paymentModuleMock = {
  imports: [PrismaModule],
  providers: [
    PaymentCreateUseCase,
    PaymentFindByPaymentIdUseCase,
    PaymentFindManyWithInvoicesIdsUseCase,
    {
      provide: IPaymentRepository,
      useClass: PaymentRepository,
    },
  ],
  exports: [
    PaymentCreateUseCase,
    PaymentFindByPaymentIdUseCase,
    PaymentFindManyWithInvoicesIdsUseCase,
  ],
};

@Module(paymentModuleMock)
export class PaymentModule {}

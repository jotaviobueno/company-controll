import { Module } from '@nestjs/common';
import {
  IPaymentRepository,
  PaymentRepository,
} from 'src/repositories/payment';
import {
  PaymentCreateUseCase,
  PaymentFindByPaymentIdUseCase,
} from './use-cases';

@Module({
  providers: [
    PaymentCreateUseCase,
    PaymentFindByPaymentIdUseCase,
    {
      provide: IPaymentRepository,
      useClass: PaymentRepository,
    },
  ],
  exports: [PaymentCreateUseCase, PaymentFindByPaymentIdUseCase],
})
export class PaymentModule {}

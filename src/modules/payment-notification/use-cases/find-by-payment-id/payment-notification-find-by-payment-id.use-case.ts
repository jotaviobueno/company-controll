import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaymentNotificationEntity } from 'src/domain/entities';
import { IPaymentNotificationRepository } from 'src/repositories/payment-notification';

@Injectable()
export class PaymentNotificationFindByPaymentIdUseCase
  implements IBaseUseCase<string, PaymentNotificationEntity>
{
  constructor(
    private readonly paymentNotificationRepository: IPaymentNotificationRepository,
  ) {}

  execute(data: string): Promise<PaymentNotificationEntity> {
    return this.paymentNotificationRepository.findByPaymentId(data);
  }
}

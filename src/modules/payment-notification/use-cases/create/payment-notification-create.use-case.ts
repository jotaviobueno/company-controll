import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreatePaymentNotificationDto } from 'src/domain/dtos';
import { PaymentNotificationEntity } from 'src/domain/entities';
import { IPaymentNotificationRepository } from 'src/repositories/payment-notification';

@Injectable()
export class PaymentNotificationCreateUseCase
  implements
    IBaseUseCase<CreatePaymentNotificationDto, PaymentNotificationEntity>
{
  constructor(
    private readonly paymentNotificationRepository: IPaymentNotificationRepository,
  ) {}

  execute({
    id,
    ...data
  }: CreatePaymentNotificationDto): Promise<PaymentNotificationEntity> {
    return this.paymentNotificationRepository.create({
      ...data,
      genericId: id,
    });
  }
}

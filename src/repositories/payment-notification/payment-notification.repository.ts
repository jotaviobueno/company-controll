import { Injectable } from '@nestjs/common';
import { IPaymentNotificationRepository } from './ipayment-notification.repository';
import { PaymentNotificationEntity } from 'src/domain/entities';

@Injectable()
export class PaymentNotificationRepository extends IPaymentNotificationRepository {
  findByPaymentId(paymentId: string): Promise<PaymentNotificationEntity> {
    return this.prismaService.paymentNotification.findFirst({
      where: {
        paymentId,
      },
    });
  }
}

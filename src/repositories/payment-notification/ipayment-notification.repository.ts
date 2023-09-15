import { IBaseRepository } from 'src/domain/base';
import { CreatePaymentNotificationDto } from 'src/domain/dtos';
import { PaymentNotificationEntity } from 'src/domain/entities';

export abstract class IPaymentNotificationRepository extends IBaseRepository<
  CreatePaymentNotificationDto,
  PaymentNotificationEntity
> {
  abstract findByPaymentId(
    paymentId: string,
  ): Promise<PaymentNotificationEntity>;
}

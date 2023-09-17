import { PaymentNotificationEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IPaymentNotificationRepository extends RepositoryFactory<PaymentNotificationEntity> {
  constructor() {
    super('paymentNotification');
  }

  abstract findByPaymentId(
    paymentId: string,
  ): Promise<PaymentNotificationEntity>;
}

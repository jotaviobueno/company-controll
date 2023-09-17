import { PaymentEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factory';

export abstract class IPaymentRepository extends RepositoryFactory<PaymentEntity> {
  constructor() {
    super('payment');
  }

  abstract findByPaymentId(paymentId: string): Promise<PaymentEntity>;
  abstract findManyWithInvoicesIds(
    invoicesIds: string[],
  ): Promise<PaymentEntity[]>;
}

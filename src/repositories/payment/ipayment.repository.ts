import { IBaseRepository } from 'src/domain/base';
import { CreatePaymentDto } from 'src/domain/dtos';
import { PaymentEntity } from 'src/domain/entities';

export abstract class IPaymentRepository extends IBaseRepository<
  CreatePaymentDto,
  PaymentEntity
> {
  abstract findByPaymentId(paymentId: string): Promise<PaymentEntity>;
}

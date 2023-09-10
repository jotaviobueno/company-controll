import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaymentEntity } from 'src/domain/entities';
import { IPaymentRepository } from 'src/repositories/payment';

@Injectable()
export class PaymentFindByPaymentIdUseCase
  implements IBaseUseCase<string, PaymentEntity>
{
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  execute(data: string): Promise<PaymentEntity> {
    return this.paymentRepository.findByPaymentId(data);
  }
}

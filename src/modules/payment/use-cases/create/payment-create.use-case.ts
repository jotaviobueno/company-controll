import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreatePaymentDto } from 'src/domain/dtos';
import { PaymentEntity } from 'src/domain/entities';
import { IPaymentRepository } from 'src/repositories/payment';

@Injectable()
export class PaymentCreateUseCase
  implements IBaseUseCase<CreatePaymentDto, PaymentEntity>
{
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  execute(data: CreatePaymentDto): Promise<PaymentEntity> {
    return this.paymentRepository.create(data);
  }
}

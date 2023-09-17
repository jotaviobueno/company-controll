import { Injectable } from '@nestjs/common';
import { IPaymentRepository } from './ipayment.repository';
import { PaymentEntity } from 'src/domain/entities';

@Injectable()
export class PaymentRepository extends IPaymentRepository {
  findByPaymentId(paymentId: string): Promise<PaymentEntity> {
    return this.prismaService.payment.findFirst({
      where: {
        paymentId,
      },
    });
  }

  findManyWithInvoicesIds(invoicesIds: string[]): Promise<PaymentEntity[]> {
    return this.prismaService.payment.findMany({
      where: {
        invoiceId: {
          in: invoicesIds,
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import DataLoader = require('dataloader');
import { IBaseDataloader } from 'src/domain/base';
import { PaymentEntity } from 'src/domain/entities';
import { PaymentFindManyWithInvoicesIdsUseCase } from 'src/modules/payment/use-cases';

@Injectable()
export class LoaderPaymentByInvoiceId
  implements IBaseDataloader<string, PaymentEntity>
{
  dataLoader: DataLoader<string, PaymentEntity[]>;

  constructor(
    private readonly paymentFindManyWithInvoicesIdsUseCase: PaymentFindManyWithInvoicesIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, PaymentEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<PaymentEntity[][]> {
    const payments =
      await this.paymentFindManyWithInvoicesIdsUseCase.execute(data);

    const paymentsMap: Record<string, PaymentEntity[]> = {};

    data.forEach((id) => {
      payments.forEach((payment) => {
        if (!paymentsMap[id]) paymentsMap[id] = [];

        if (id === payment.invoiceId) paymentsMap[id].push(payment);
      });
    });

    return data.map((id) => paymentsMap[id] ?? []);
  }

  load(data: string): Promise<PaymentEntity[]> {
    return this.dataLoader.load(data);
  }
}

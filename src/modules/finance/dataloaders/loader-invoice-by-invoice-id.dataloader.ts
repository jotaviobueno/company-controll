import { Injectable } from '@nestjs/common';
import DataLoader = require('dataloader');
import { IBaseDataloader } from 'src/domain/base';
import { InvoiceEntity } from 'src/domain/entities';
import { InvoiceFindManyWithInvoicesIdsUseCase } from 'src/modules/invoice/use-cases';

@Injectable()
export class LoaderInvoiceByInvoiceId
  implements IBaseDataloader<string, InvoiceEntity>
{
  dataLoader: DataLoader<string, InvoiceEntity[]>;

  constructor(
    private readonly invoiceFindManyWithInvoicesIdsUseCase: InvoiceFindManyWithInvoicesIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, InvoiceEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<InvoiceEntity[][]> {
    const invoices =
      await this.invoiceFindManyWithInvoicesIdsUseCase.execute(data);

    const invoicesMap: Record<string, InvoiceEntity[]> = {};

    data.forEach((id) => {
      invoices.forEach((invoice) => {
        if (!invoicesMap[id]) invoicesMap[id] = [];

        if (id === invoice.id) invoicesMap[id].push(invoice);
      });
    });

    return data.map((id) => invoicesMap[id] ?? []);
  }

  load(data: string): Promise<InvoiceEntity[]> {
    return this.dataLoader.load(data);
  }
}

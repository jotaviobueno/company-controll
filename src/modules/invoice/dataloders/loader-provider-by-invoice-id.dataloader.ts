import { Injectable } from '@nestjs/common';
import DataLoader = require('dataloader');
import { IBaseDataloader } from 'src/domain/base';
import { ProviderEntity } from 'src/domain/entities';
import { InvoiceProviderFindManyWithInvoicesIdsUseCase } from 'src/modules/invoice-provider/use-cases';
import { ProviderFindManyWithIdsUseCase } from 'src/modules/provider/use-cases';

@Injectable()
export class LoaderProviderByInvoiceId
  implements IBaseDataloader<string, ProviderEntity>
{
  dataLoader: DataLoader<string, ProviderEntity[]>;

  constructor(
    private readonly invoiceProviderFindManyWithInvoicesIdsUseCase: InvoiceProviderFindManyWithInvoicesIdsUseCase,
    private readonly providerFindManyWithIdsUseCase: ProviderFindManyWithIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, ProviderEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<ProviderEntity[][]> {
    const invoicesProviders =
      await this.invoiceProviderFindManyWithInvoicesIdsUseCase.execute(data);

    const providersIds = invoicesProviders.map(
      (invoiceCompany) => invoiceCompany.providerId,
    );

    const providers =
      await this.providerFindManyWithIdsUseCase.execute(providersIds);

    const providersMap: Record<string, ProviderEntity[]> = {};

    invoicesProviders.forEach((invoiceProvider) => {
      providers.forEach((provider) => {
        if (!providersMap[invoiceProvider.invoiceId])
          providersMap[invoiceProvider.invoiceId] = [];

        if (provider.id === invoiceProvider.providerId)
          providersMap[invoiceProvider.invoiceId].push(provider);
      });
    });

    return data.map((id) => providersMap[id] ?? []);
  }

  load(data: string): Promise<ProviderEntity[]> {
    return this.dataLoader.load(data);
  }
}

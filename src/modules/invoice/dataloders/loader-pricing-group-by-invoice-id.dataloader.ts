import { Injectable } from '@nestjs/common';
import DataLoader = require('dataloader');
import { IBaseDataloader } from 'src/domain/base';
import { PricingGroupEntity } from 'src/domain/entities';
import { InvoicePricingGroupFindManyWithInvoicesIds } from 'src/modules/invoice-pricing-group/use-cases';
import { PricingGroupFindManyWithIdsUseCase } from 'src/modules/pricing-group/use-cases';

@Injectable()
export class LoaderPricingGroupByInvoiceId
  implements IBaseDataloader<string, PricingGroupEntity>
{
  dataLoader: DataLoader<string, PricingGroupEntity[]>;

  constructor(
    private readonly invoicePricingGroupFindManyWithInvoicesIds: InvoicePricingGroupFindManyWithInvoicesIds,
    private readonly pricingGroupFindManyWithIdsUseCase: PricingGroupFindManyWithIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, PricingGroupEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<PricingGroupEntity[][]> {
    const invoicePricingGroups =
      await this.invoicePricingGroupFindManyWithInvoicesIds.execute(data);

    const pricingGroupIds = invoicePricingGroups.map(
      (invoiceperson) => invoiceperson.pricingGroupId,
    );

    const pricingGroups =
      await this.pricingGroupFindManyWithIdsUseCase.execute(pricingGroupIds);

    const personsMap: Record<string, PricingGroupEntity[]> = {};

    invoicePricingGroups.forEach((invoicePricingGroup) => {
      pricingGroups.forEach((pricingGroup) => {
        if (!personsMap[invoicePricingGroup.invoiceId])
          personsMap[invoicePricingGroup.invoiceId] = [];

        if (pricingGroup.id === invoicePricingGroup.pricingGroupId)
          personsMap[invoicePricingGroup.invoiceId].push(pricingGroup);
      });
    });

    return data.map((id) => personsMap[id] ?? []);
  }

  load(data: string): Promise<PricingGroupEntity[]> {
    return this.dataLoader.load(data);
  }
}

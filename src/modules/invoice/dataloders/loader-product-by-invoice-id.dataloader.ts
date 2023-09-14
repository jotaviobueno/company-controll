import { Injectable } from '@nestjs/common';
import DataLoader = require('dataloader');
import { IBaseDataloader } from 'src/domain/base';
import { ProductEntity } from 'src/domain/entities';
import { InvoiceProductFindManyWithInvoicesIdsUseCase } from 'src/modules/invoice-product/use-case';
import { ProductFindManyWithIdsUseCase } from 'src/modules/product/use-cases';

@Injectable()
export class LoaderProductByInvoiceId
  implements IBaseDataloader<string, ProductEntity>
{
  dataLoader: DataLoader<string, ProductEntity[]>;

  constructor(
    private readonly invoiceProductFindManyWithInvoicesIdsUseCase: InvoiceProductFindManyWithInvoicesIdsUseCase,
    private readonly productFindManyWithIdsUseCase: ProductFindManyWithIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, ProductEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<ProductEntity[][]> {
    const invoiceProduct =
      await this.invoiceProductFindManyWithInvoicesIdsUseCase.execute(data);

    const productIds = invoiceProduct.map(
      (invoiceperson) => invoiceperson.productId,
    );

    const products =
      await this.productFindManyWithIdsUseCase.execute(productIds);

    const productsMap: Record<string, ProductEntity[]> = {};

    invoiceProduct.forEach((invoiceProduct) => {
      products.forEach((product) => {
        if (!productsMap[invoiceProduct.invoiceId])
          productsMap[invoiceProduct.invoiceId] = [];

        if (product.id === invoiceProduct.productId)
          productsMap[invoiceProduct.invoiceId].push(product);
      });
    });

    return data.map((id) => productsMap[id] ?? []);
  }

  load(data: string): Promise<ProductEntity[]> {
    return this.dataLoader.load(data);
  }
}

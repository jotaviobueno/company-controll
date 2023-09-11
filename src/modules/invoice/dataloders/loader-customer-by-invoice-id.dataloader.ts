import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { IBaseDataloader } from 'src/domain/base';
import { CustomerEntity } from 'src/domain/entities';
import { CustomerFindManyWithIdsUseCase } from 'src/modules/customer/use-cases';
import { InvoiceCustomerFindManyWithIdsUseCase } from 'src/modules/invoice-customer/use-cases';

@Injectable()
export class LoaderCustomerByInvoiceId
  implements IBaseDataloader<string, CustomerEntity>
{
  dataLoader: DataLoader<string, CustomerEntity[]>;

  constructor(
    private readonly invoiceCustomerFindManyWithIdsUseCase: InvoiceCustomerFindManyWithIdsUseCase,
    private readonly customerFindManyWithIdsUseCase: CustomerFindManyWithIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, CustomerEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<CustomerEntity[][]> {
    const invoiceCustomers =
      await this.invoiceCustomerFindManyWithIdsUseCase.execute(data);

    const customersIds = invoiceCustomers.map(
      (invoiceCustomer) => invoiceCustomer.customerId,
    );

    const customers =
      await this.customerFindManyWithIdsUseCase.execute(customersIds);

    const customersMap: Record<string, CustomerEntity[]> = {};

    invoiceCustomers.forEach((invoiceCustomer) => {
      customers.forEach((customer) => {
        if (!customersMap[invoiceCustomer.invoiceId])
          customersMap[invoiceCustomer.invoiceId] = [];

        if (customer.id === invoiceCustomer.customerId)
          customersMap[invoiceCustomer.invoiceId].push(customer);
      });
    });

    return data.map((id) => customersMap[id] ?? []);
  }

  load(data: string): Promise<CustomerEntity[]> {
    return this.dataLoader.load(data);
  }
}

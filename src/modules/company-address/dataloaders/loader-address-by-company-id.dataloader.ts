import { Injectable } from '@nestjs/common';
import DataLoader = require('dataloader');
import { IBaseDataloader } from 'src/domain/base';
import { AddressEntity } from 'src/domain/entities';
import { CompanyAddressFindManyWithCompanyIdUseCase } from '../use-cases';
import { AddressFindManyWithIdsUseCase } from 'src/modules/address/use-cases';

@Injectable()
export class LoaderAddressByCompanyId
  implements IBaseDataloader<string, AddressEntity>
{
  dataLoader: DataLoader<string, AddressEntity[]>;

  constructor(
    private readonly companyAddressFindManyWithCompanyIdUseCase: CompanyAddressFindManyWithCompanyIdUseCase,
    private readonly addressFindManyWithIdsUseCase: AddressFindManyWithIdsUseCase,
  ) {
    this.dataLoader = new DataLoader<string, AddressEntity[]>(
      (keys) => this.batch([...keys]),
      {
        cache: true,
      },
    );
  }

  async batch(data: string[]): Promise<AddressEntity[][]> {
    const companiesAddresses =
      await this.companyAddressFindManyWithCompanyIdUseCase.execute(data);

    const addressesIds = companiesAddresses.map(
      (companyAddress) => companyAddress.addressId,
    );

    const addresses =
      await this.addressFindManyWithIdsUseCase.execute(addressesIds);

    const addressMap: Record<string, AddressEntity[]> = {};

    companiesAddresses.forEach((companyAddress) => {
      addresses.forEach((address) => {
        if (!addressMap[companyAddress.companyId])
          addressMap[companyAddress.companyId] = [];

        if (address.id === companyAddress.addressId)
          addressMap[companyAddress.companyId].push(address);
      });
    });

    return data.map((id) => addressMap[id] ?? []);
  }

  load(data: string): Promise<AddressEntity[]> {
    return this.dataLoader.load(data);
  }
}

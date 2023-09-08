import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CreateAddressInput } from 'src/domain/dtos';
import { CustomerAddressEntity } from 'src/domain/entities';
import { AddressCreateUseCase } from 'src/modules/address/use-cases';
import { CustomerFindOneUseCase } from 'src/modules/customer/use-cases';
import { ICustomerAddressRepostiroy } from 'src/repositories/customer-address';

@Injectable()
export class CustomerAddressCreateUseCase
  implements
    IBaseUseCase<
      CreateAddressInput & {
        customerId: string;
      },
      CustomerAddressEntity
    >
{
  constructor(
    private readonly customerFindOneUseCase: CustomerFindOneUseCase,
    private readonly addressCreateUseCase: AddressCreateUseCase,
    private readonly customerAddressRepository: ICustomerAddressRepostiroy,
  ) {}

  async execute({
    customerId,
    ...createAddressInput
  }: CreateAddressInput & {
    customerId: string;
  }): Promise<CustomerAddressEntity> {
    const customer = await this.customerFindOneUseCase.execute(customerId);

    const address = await this.addressCreateUseCase.execute(createAddressInput);

    const customerAddress = await this.customerAddressRepository.create({
      addressId: address.id,
      customerId: customer.id,
    });

    return customerAddress;
  }
}

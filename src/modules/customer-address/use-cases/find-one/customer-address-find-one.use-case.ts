import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { CustomerAddressEntity } from 'src/domain/entities';
import { ICustomerAddressRepostiroy } from 'src/repositories/customer-address';

@Injectable()
export class CustomerAddressFindOneUseCase
  implements IBaseUseCase<string, CustomerAddressEntity>
{
  constructor(
    private readonly customerAddressRepository: ICustomerAddressRepostiroy,
  ) {}

  async execute(data: string): Promise<CustomerAddressEntity> {
    const customerAddress = await this.customerAddressRepository.findById(data);

    if (!customerAddress)
      throw new HttpException(
        'customer address not found',
        HttpStatus.NOT_FOUND,
      );

    return customerAddress;
  }
}

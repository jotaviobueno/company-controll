import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from 'src/domain/base';
import { PaginationOptionsInput } from 'src/domain/dtos';
import { CustomerAddressEntity } from 'src/domain/entities';
import { ICustomerAddressRepostiroy } from 'src/repositories/customer-address';

@Injectable()
export class CustomerAddressFindAllUseCase
  implements IBaseUseCase<PaginationOptionsInput, CustomerAddressEntity[]>
{
  constructor(
    private readonly customerAddressRepository: ICustomerAddressRepostiroy,
  ) {}

  execute(data: PaginationOptionsInput): Promise<CustomerAddressEntity[]> {
    return this.customerAddressRepository.findAll(data);
  }
}
